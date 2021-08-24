
const pluginRss = require("@11ty/eleventy-plugin-rss")

module.exports = function (eleventyConfig) {
  eleventyConfig.addTemplateFormats('hbs,md,css')

  require('./build/filters')(eleventyConfig)
  require('./build/collections')(eleventyConfig)
  require('./build/markdown')(eleventyConfig)

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
   RESPONSIVE IMAGES
   ****************************************************************************/

  Array.prototype.flat = function () {
    return this.reduce((acc, cur) => acc.concat(cur), [])
  }
  eleventyConfig.addPlugin(require('eleventy-plugin-local-respimg'), {
    folders: { source: '.', output: '_site' },
    images: {
      resize: {
        min: 70,
      },
      sizes: '(max-width: 848px) calc(100vw - 64px), 784px',
      watch: { src: 'assets/**/*' },
      lazy: true,
    },
  })

  /****************************************************************************
   PLUGINS
   ****************************************************************************/

  eleventyConfig.addPlugin(require("@11ty/eleventy-plugin-rss"))
  eleventyConfig.addPlugin(require('@11ty/eleventy-plugin-syntaxhighlight'), {
  	init: ({ Prism }) => {
  	  try { require('prism-hyperscript')(Prism) } catch (e) {}
  	}
  })
  eleventyConfig.addDataExtension('yaml', contents => require('js-yaml').load(contents))

  /****************************************************************************
   CONFIG
   ****************************************************************************/

  return {
    dir: { output: '_site', includes: 'includes', data: 'data' },
    htmlTemplateEngine: 'hbs',
    markdownTemplateEngine: 'hbs'
  }
}

