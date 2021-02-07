const pluginRss = require("@11ty/eleventy-plugin-rss")

module.exports = function (eleventyConfig) {
  eleventyConfig.addTemplateFormats('njk,md,css')
  addPassthroughCopy(eleventyConfig)
  addCustomCollections(eleventyConfig)
  addTemplateCustomizations(eleventyConfig)
  addFilters(eleventyConfig)
  addResponsiveImages(eleventyConfig)

  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-rss"))
  eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'))

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
}

function addPassthroughCopy(eleventyConfig) {
  eleventyConfig.addPassthroughCopy('assets')
}

function addCustomCollections(eleventyConfig) {
  eleventyConfig.addCollection('posts',
      coll => coll.getFilteredByGlob('posts/*'))
}

function addFilters(eleventyConfig) {

  eleventyConfig.addFilter('markdown',
    str => util.markdownLibrary.render(str))

  eleventyConfig.addPairedShortcode('markdown', 
    str => util.markdownLibrary.render(str))

  const { DateTime } = require('luxon')
  const dateify = d => d instanceof Date ? DateTime.fromJSDate(d) : typeof d == 'string' ? DateTime.fromISO(d) : DateTime.local()

  eleventyConfig.addFilter('datefmt', (date, fmt) => dateify(date).toFormat(fmt))

  eleventyConfig.addFilter('isodate', (date) => dateify(date).toISODate())
  eleventyConfig.addFilter('isodatetime', (date) => dateify(date).toISO())
  eleventyConfig.addFilter('isotime', (date) => dateify(date).toISOTime())

  eleventyConfig.addShortcode('img', (src, alt) => {
    return `<a class="image-link" href="${src}">
      <img src="${src}" alt="${alt}" title="${alt}">
    </a>`
  })
}

function addTemplateCustomizations(eleventyConfig) {
  eleventyConfig.setLibrary("md", util.markdownLibrary)
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
        step: 200, // Width difference between each resized image
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
