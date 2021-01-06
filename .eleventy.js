
module.exports = function (eleventyConfig) {
  eleventyConfig.addTemplateFormats('njk,md,css')
  addPassthroughCopy(eleventyConfig)
  addCustomCollections(eleventyConfig)
  // addHtmlMinification(eleventyConfig)
  addTemplateCustomizations(eleventyConfig)
  addCustomDataFormats(eleventyConfig)
  addFilters(eleventyConfig)
  addResponsiveImages(eleventyConfig)
  // addOptimizations(eleventyConfig)

  return {
    dir: { input: '.', output: '_site', includes: 'includes', data: 'data' },
  }
}

const util = {
  get markdownLibrary() {
    if ('_markdownLibrary' in this) return this._markdownLibrary

    const mdLib = require("markdown-it")({
      html: true,
      breaks: true,
      linkify: true,
      typographer: true,
    })

    mdLib.use(require("markdown-it-attrs"))
    mdLib.use(require('markdown-it-footnote'))

    return this._markdownLibrary = mdLib
  },

  esc(str) {
    return String(str).replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
  },

  basicFormatting(str) {
    str = this.esc(str)

    str = str.replace(/\n/g, "<br>")
      .replace(/&quot;(.*)&quot;/g, "<q>$1</q>")
      .replace(/--/g, "&mdash;")
      .replace(/\.\.\.+/g, "&hellip;")
      .replace(/\(c\)/g, "&copy;")
      .replace(/\(c\)/g, "&copy;")
      .replace(/\(tm\)/g, "&trade;")
      .replace(/\(r\)/g, "&reg;")
      .replace(/&lt;-/g, "&larr;")
      .replace(/-&gt;/g, "&rarr;")
      .replace(/&lt;=/g, "&lArr;")
      .replace(/=&gt;/g, "&rArr;")
      .replace(/`(.*)`/g, "<code>$1</code>")

    const linkifyHtml = require('linkifyjs/html')
    str = linkifyHtml(str, { defaultProtocol: 'https' })

    return str
  },

  SafeHtml: class {
    constructor(str) { this.str = str }
    toString() { return this.str }
  },

  html(strs, ...parts) {
    let rv = []

    for (let i = 0; i < strs.length; i++) {
      rv.push(strs[i], 
        parts[i] instanceof util.SafeHtml ? parts[i] : this.esc(parts[i]))
    }

    rv.pop() // remove `undefined` at the end
    return new util.SafeHtml(rv.join(''))
  },

  img(src, alt) {
    return util.html`<a class="image-link" href="${src}">
      <img src="${src}" alt="${alt}" title="${alt}">
    </a>`
  },

  coffee(...args) {
    return require('coffeescript').eval(...args)
  }
}

for (const fn in util) {
  if (util[fn] instanceof Function) util[fn] = util[fn].bind(util)
}

function addPassthroughCopy(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('assets')
}

function addCustomCollections(eleventyConfig) {
  eleventyConfig.addCollection('posts',
      coll => coll.getFilteredByGlob('posts/*'))

  eleventyConfig.addCollection('Türkçe',
      coll => coll.getAll().filter(item => item.data.lang === 'tr'))
}

function addHtmlMinification(eleventyConfig) {
  // https://www.11ty.dev/docs/config/#transforms-example-minify-html-output
  const htmlmin = require("html-minifier")

  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {
    if (outputPath.endsWith(".html")) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
        minifyCSS: true,
        minifyJS: true,
      })
      return minified
    }
    return content
  })
}

function addFilters(eleventyConfig) {
  const moment = require('moment')

  eleventyConfig.addFilter('moment', (date, format, tz = "+0300") => {
    return moment(date).utcOffset(tz).format(format)
  })

  eleventyConfig.addFilter('markdown',
    str => util.markdownLibrary.render(str))

  eleventyConfig.addPairedShortcode('markdown', 
    str => util.markdownLibrary.render(str))

  eleventyConfig.addFilter('basicFormatting', util.basicFormatting)

  eleventyConfig.addFilter('keys', Object.keys)

  eleventyConfig.addFilter('absoluteUrl', relUrl => new URL(relUrl, 
    'https://www.denizaksimsek.com/').href)

  eleventyConfig.addShortcode('img', util.img)

  eleventyConfig.addShortcode('_', (lang, ...args) => {
    let strings = {}
    for (let i = 0; i < args.length - 1; i += 2) {
      if (args[i] == lang) return args[i + 1]
    }
    return args[args.length - 1]
  })
}

function addTemplateCustomizations(eleventyConfig) {
  addMarkdownLibraryOptions()
  addFrontmatterCustomizations()
  addPlugins()

  function addMarkdownLibraryOptions() {
    eleventyConfig.setLibrary("md", util.markdownLibrary)
  }

  function addFrontmatterCustomizations() {
    eleventyConfig.setFrontMatterParsingOptions({
      excerpt: true,
      excerpt_separator: '<!-- endexcerpt -->',

      language: 'coffee', 
      engines: {
        coffee: util.coffee
      }
    })
  }

  function addPlugins() {
    eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'))
  }
}

function addCustomDataFormats(eleventyConfig) {
  const toml = require('toml')
  eleventyConfig.addDataExtension('toml', s => toml.parse(s))
}

function addResponsiveImages(eleventyConfig) {
  Array.prototype.flat = function () {
    return this.reduce((acc, cur) => acc.concat(cur), [])
  }
  eleventyConfig.addPlugin(require('eleventy-plugin-local-respimg'), {
    folders: {
      source: '.', // Folder images are stored in
      output: '_site', // Folder images should be output to
    },
    images: {
      resize: {
        min: 200, // Minimum width to resize an image to
        max: 1200, // Maximum width to resize an image to
        step: 150, // Width difference between each resized image
      },
      gifToVideo: false, // Convert GIFs to MP4 videos
      sizes: 'calc(100vw - 1.2em), (min-width: 768px) 700px', // Default image `sizes` attribute
      lazy: true, // Include `loading="lazy"` attribute for images
      additional: [
        // Globs of additional images to optimize (won't be resized)
      ],
      watch: {
        src: 'assets/**/*', // Glob of images that Eleventy should watch for changes to
      },
    },
  })
}

function addOptimizations(eleventyConfig) {
  eleventyConfig.setWatchJavaScriptDependencies(false)
}
