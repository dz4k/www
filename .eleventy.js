
const { DateTime } = require('luxon')
const pluginRss = require("@11ty/eleventy-plugin-rss")

const interactionTypes = require('./data/interactionTypes.json')

module.exports = function (eleventyConfig) {
  eleventyConfig.addTemplateFormats('hbs,md,css')

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
   COLLECTIONS
   ****************************************************************************/

  eleventyConfig.addCollection('entries', collectionApi => collectionApi
    .getFilteredByGlob('entries/*')
    .filter(entry => !entry.data.deleted))

  eleventyConfig.addCollection('posts', collectionApi => collectionApi
    .getFilteredByGlob('entries/*')
    .filter(entry => 'title' in entry.data))

  eleventyConfig.addCollection('interact', collectionApi => collectionApi
    .getFilteredByGlob('entries/*')
    .filter(entry => entry.data.interaction))
    
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

  const luxify = d => 
    (d instanceof Date   ? DateTime.fromJSDate(d) :
    typeof d == 'string' ? DateTime.fromISO(d) :
    /* else */             DateTime.local()).setZone('UTC+03')

  eleventyConfig.addFilter('datefmt', (date, fmt) => luxify(date).toFormat(fmt))
  eleventyConfig.addFilter('isodate', date => luxify(date).toISODate())
  eleventyConfig.addFilter('isodatetime', date => luxify(date).toISO())
  eleventyConfig.addFilter('isotime', date => luxify(date).toISOTime())
  eleventyConfig.addFilter('dateid', date => luxify(date).toFormat('MMddHHmmss'))

  eleventyConfig.addFilter('interaction', function (ia) {
		return ia.interactionType
			? ia[ia.interactionType]
			: ia.data[ia.data.interactionType]
	})

  eleventyConfig.addFilter('groupByYear', coll => {
    const rv = []
    for (const entry of coll) {
      let current = rv[rv.length - 1]
      if (current == undefined || entry.date.getFullYear() != current.year) {
          rv.push(current = { year: entry.date.getFullYear(), entries: [] })
      }
      current.entries.push(entry)
    }
    return rv
  })
  
  eleventyConfig.addFilter('reverse', e => (function*() {
    for (let i = e.length - 1; i >= 0; i--) yield e[i]
  }()))

  eleventyConfig.addFilter('limit', (i, e) => (function*() {
    let n = 0
    for (const v of e) {
      if (n++ == i) break
      yield v
    }
  }()))
  
  eleventyConfig.addFilter('eq', (a, b) => a === b)
  
  eleventyConfig.addFilter('and', (...args) => args.reduce((a, b) => a && b))
  eleventyConfig.addFilter('or',  (...args) => args.reduce((a, b) => a || b))
  eleventyConfig.addFilter('not', a => !a)
  
  eleventyConfig.addFilter('d', (...args) => 
    args.find(arg => arg !== undefined && arg !== null))
  
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
`

<figure><figcaption>${
	typeof link === 'string' 
		? `<a href="${link}">${markdownLibrary.renderInline(caption)}</a>`
    : markdownLibrary.renderInline(caption)
}</figcaption>

${body}

</figure>

`) // `

	eleventyConfig.addShortcode('set', function ({ hash, data: { root } }) {
		Object.assign(root, hash)
	})

	eleventyConfig.addShortcode('eval', function (body) {
		return new Function('with (this) return ' + body).call(this)
	})

	eleventyConfig.addPairedShortcode('exec', function (body) {
		return new Function('with (this) { ' + body + ' }').call(this)
	})

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
