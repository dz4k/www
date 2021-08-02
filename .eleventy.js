
const { DateTime } = require('luxon')
const pluginRss = require("@11ty/eleventy-plugin-rss")

module.exports = function (eleventyConfig) {
  eleventyConfig.addTemplateFormats('njk,md,css')

  /****************************************************************************
   PASSTHROUGH COPY
   ****************************************************************************/

  eleventyConfig.addPassthroughCopy('assets')
  eleventyConfig.addPassthroughCopy('styles')
  eleventyConfig.addPassthroughCopy('/assets/fonts/')

  /****************************************************************************
   LAYOUTS
   ****************************************************************************/  

  eleventyConfig.addLayoutAlias('entry', 'layout/entry.njk')
  eleventyConfig.addLayoutAlias('page', 'layout/base.njk')

  /****************************************************************************
   COLLECTIONS
   ****************************************************************************/

  eleventyConfig.addCollection('entries', collectionApi => collectionApi
    .getFilteredByGlob('entries/*')
    .filter(entry => !entry.data.deleted))

  eleventyConfig.addCollection('longform', collectionApi => collectionApi
    .getFilteredByGlob('entries/*')
    .filter(entry => 'title' in entry.data && !entry.data.deleted))

  eleventyConfig.addCollection('bookmark', collectionApi => collectionApi
    .getFilteredByGlob('entries/*')
    .filter(entry => 'bookmarkOf' in entry.data && !entry.data.deleted))
    
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
    anchorPrefix: 'h-',
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
    (d instanceof Date   ? DateTime.fromJSDate(d) :
    typeof d == 'string' ? DateTime.fromISO(d) :
    /* else */             DateTime.local()).setZone('UTC+03')

  eleventyConfig.addFilter('datefmt', (date, fmt) => luxify(date).toFormat(fmt))
  eleventyConfig.addFilter('isodate', date => luxify(date).toISODate())
  eleventyConfig.addFilter('isodatetime', date => luxify(date).toISO())
  eleventyConfig.addFilter('isotime', date => luxify(date).toISOTime())

  eleventyConfig.addFilter('truncateUrl', url => {
    if (typeof url !== 'string') return url
    url = new URL(url)
    const path = url.pathname.split('/')
    const dotdotdot = path.length > 2 || url.query || url.hash
    if (path.length > 2) {
      url.pathname = `${path.slice(0, 2).join('/')}/`
    }
    url.query = null
    url.hash = ''
    return url.href + (dotdotdot ? '…' : '')
  })

  eleventyConfig.addPairedShortcode('fig', (body, caption, link) =>
`<figure><figcaption>${
	link ? `<a href="${link}">${caption}</a>` : caption
}</figcaption>

${body}

</figure>`)

  /****************************************************************************
   RESPONSIVE IMAGES
   ****************************************************************************/

  Array.prototype.flat = function () {
    return this.reduce((acc, cur) => acc.concat(cur), [])
  }
  eleventyConfig.addPlugin(require('eleventy-plugin-local-respimg'), {
    folders: { source: '.', output: '_site' },
    images: {
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

  /****************************************************************************
   CONFIG
   ****************************************************************************/

  return {
    dir: { output: '_site', includes: 'includes', data: 'data' },
    htmlTemplateEngine: 'hbs',
    markdownTemplateEngine: 'hbs'
  }
}
