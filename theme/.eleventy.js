
const { DateTime } = require('luxon')
const pluginRss = require("@11ty/eleventy-plugin-rss")

module.exports = function (eleventyConfig) {
  eleventyConfig.addTemplateFormats('njk,md,css')

  /****************************************************************************
   PASSTHROUGH COPY
   ****************************************************************************/

  eleventyConfig.addPassthroughCopy('assets')
  eleventyConfig.addPassthroughCopy({ 'theme/styles': '/styles/' })
  eleventyConfig.addPassthroughCopy({ 'theme/fonts': '/assets/fonts/' })

  /****************************************************************************
   COLLECTIONS
   ****************************************************************************/

  eleventyConfig.addCollection('posts', collectionApi => collectionApi
    .getFilteredByGlob('posts/*')
    .filter(post => !post.data.deleted))

  eleventyConfig.addCollection('deleted', collectionApi => collectionApi
    .getAll()
    .filter(entry => entry.data.deleted))

  /****************************************************************************
   MARKDOWN
   ****************************************************************************/

  const markdownLibrary = require("markdown-it")({
    html: true,
    linkify: true,
    typographer: true,
  })

  markdownLibrary.use(require("markdown-it-attrs"))
  markdownLibrary.use(require('markdown-it-footnote'))

  eleventyConfig.setLibrary("md", markdownLibrary)

  /****************************************************************************
   FILTERS AND SHORTCODES
   ****************************************************************************/

  eleventyConfig.addFilter('markdown',
    str => markdownLibrary.render(str))

  eleventyConfig.addPairedShortcode('markdown', 
    str => markdownLibrary.render(str))

  const luxify = d => 
    d instanceof Date    ? DateTime.fromJSDate(d) :
    typeof d == 'string' ? DateTime.fromISO(d) :
    /* else */             DateTime.local()

  eleventyConfig.addFilter('datefmt', (date, fmt) => luxify(date).toFormat(fmt))
  eleventyConfig.addFilter('isodate', date => luxify(date).toISODate())
  eleventyConfig.addFilter('isodatetime', date => luxify(date).toISO())
  eleventyConfig.addFilter('isotime', date => luxify(date).toISOTime())

  /****************************************************************************
   RESPONSIVE IMAGES
   ****************************************************************************/

  Array.prototype.flat = function () {
    return this.reduce((acc, cur) => acc.concat(cur), [])
  }
  eleventyConfig.addPlugin(require('eleventy-plugin-local-respimg'), {
    folders: { source: '.', output: '_site' },
    images: {
      sizes: 'min(96vw, 700px)',
      watch: { src: 'assets/**/*' },
    },
  })

  /****************************************************************************
   PLUGINS
   ****************************************************************************/

  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-rss"))
  eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'))

  /****************************************************************************
   CONFIG
   ****************************************************************************/

  return {
    dir: { output: '_site', includes: 'theme/includes', data: 'theme/data' },
  }
}
