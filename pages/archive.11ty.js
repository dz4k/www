
const h = require('hyperscript')
const entry = require('../includes/partials/entry.11ty.js')
const	tagList = require('../includes/partials/tag-list.11ty.js')

module.exports = class {
	data() {
		return {
			pagination: {
				data: 'collections', size: 1, alias: 'tag'
			},
			layout: 'layout',
			permalink: ({tag}) => tag === 'all' ? '/archive/' : `/archive/${tag}/`,
			eleventyComputed: {
				lang: ({tag}) => tag === 'Türkçe' ? 'tr' : 'en'
			}
		}
	}

	render(data) {
		const {collections, tag} = data
		const coll = collections[tag]

		return [
			tag === 'all' ? [
					h('h1', 'Archive'),
					h('p',
						h('b', 'By tag: '),
						tagList(Object.keys(collections), collections))
				] : h('h1', tag, h('sup', coll.length)),
			this.rss(data),
			h('ol.entry-list', {reversed: 'reversed'},
				coll.slice().reverse().map(en =>
					h('li', entry(data, en, {processExcerpt: this.markdown}))
				)
			)
		]
	}

	rss({tag}) {
		return h('p', 'RSS: ', h('code',
			`https://www.denizaksimsek.com/feed/${tag !== 'all' ? tag+'/' : ''}feed.rss`)
		)
	}
}
