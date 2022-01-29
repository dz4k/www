
const pluginRss = require("@11ty/eleventy-plugin-rss")

module.exports = function (eleventyConfig) {
  eleventyConfig.addTemplateFormats('hbs,md,css')

  require('./build/filters')(eleventyConfig)
  require('./build/collections')(eleventyConfig)
  require('./build/markdown')(eleventyConfig)
  require('./build/respimg')(eleventyConfig)

  eleventyConfig.setFrontMatterParsingOptions({
  	delimiters: ['<!--', '-->']
  })

  /****************************************************************************
   PASSTHROUGH COPY
   ****************************************************************************/

  eleventyConfig.addPassthroughCopy('assets')
  eleventyConfig.addPassthroughCopy('styles')

  /****************************************************************************
   LAYOUTS
   ****************************************************************************/

  eleventyConfig.addLayoutAlias('entry', 'layout/entry.hbs')
  eleventyConfig.addLayoutAlias('page', 'layout/base.hbs')

  /****************************************************************************
   PLUGINS
   ****************************************************************************/

  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-rss"))

  const syntaxhighlight = require('@11ty/eleventy-plugin-syntaxhighlight')
  eleventyConfig.addPlugin(syntaxhighlight, {
  	init: ({ Prism }) => {
  	  require('prism-hyperscript')(Prism)
  	}
  })
  eleventyConfig.addPairedShortcode("highlight",
  	(a, b) => syntaxhighlight.pairedShortcode(a, b))

  /****************************************************************************
   CONFIG
   ****************************************************************************/

  return {
    dir: { output: '_site', includes: 'includes', data: 'data' },
    htmlTemplateEngine: 'hbs',
    markdownTemplateEngine: 'hbs'
  }
}

