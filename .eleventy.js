
module.exports = function (eleventyConfig) {
  eleventyConfig.addTemplateFormats('njk,md,css')
  addPassthroughCopy(eleventyConfig)
  addCustomCollections(eleventyConfig)
  addHtmlMinification(eleventyConfig)
  addFilters(eleventyConfig)
  addTemplateCustomizations(eleventyConfig)
  addResponsiveImages(eleventyConfig)
  // addOptimizations(eleventyConfig)

  return {
    dir: { input: '.', output: '_site', includes: 'includes', data: 'data' },
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  }
}

const markdownIt = require("markdown-it")
const mdLib = markdownIt({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true,
})
mdLib.use(require("markdown-it-attrs"))
mdLib.use(require('markdown-it-footnote'))

function addPassthroughCopy(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('assets')
}

function addCustomCollections(eleventyConfig) {
  eleventyConfig.addCollection('post',
    coll => coll.getFilteredByGlob('entries/*'))
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

  eleventyConfig.addFilter('moment', (date, format) => {
    return moment(date).utcOffset("+0300").format(format)
  })

  eleventyConfig.addFilter('markdown', str => mdLib.render(str))

  eleventyConfig.addPairedShortcode('markdown', str => mdLib.render(str))

  // TODO: add basic formatting
  eleventyConfig.addFilter('basicFormatting', str => str)

  eleventyConfig.addFilter('isJustWhitespace', str => !/[^\s]/.test(str))

  eleventyConfig.addFilter('keys', Object.keys)

  eleventyConfig.addFilter('absoluteUrl', relUrl => new URL(relUrl, 
    'https://www.denizaksimsek.com/').href)

  eleventyConfig.addShortcode('img', (src, alt, {
  	title = true, link = true, figure = false
  } = {}) => {
  	let rv = `![${alt}](${src}${title ? ` "${alt}"` : ""})`
  	if (link) rv = `[${rv}](${src})`
  	if (figure) rv = `<figure>\n\n${rv}\n\n<figcaption>${alt}</figcaption></figure>`
  	return rv
  })

  eleventyConfig.addFilter('function', (code, ...args) => 
    new Function(...args, code)
  )
}

function addTemplateCustomizations(eleventyConfig) {
  addMarkdownLibraryOptions()
  addNunjucksCustomizations()
  addExcerpts()
  addPlugins()

  function addMarkdownLibraryOptions() {
    eleventyConfig.setLibrary("md", mdLib)
  }

  function addNunjucksCustomizations() {
    const Nunjucks = require("nunjucks");
    eleventyConfig.setLibrary('njk', Nunjucks.configure('includes', {
      tags: { commentStart: '{##', commentEnd: '##}' }
    }))
  }

  function addExcerpts() {
    eleventyConfig.setFrontMatterParsingOptions({
      excerpt: true,
      excerpt_separator: '<!-- endexcerpt -->'
    })
  }

  function addPlugins() {
    eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'))
  }
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
