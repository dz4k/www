
const h = require('hyperscript')
const entry = require('../includes/partials/entry.11ty.js')
const	tagList = require('../includes/partials/tag-list.11ty.js')

module.exports = class {
	data() {
		return {
			pagination: {
				data: 'collections', size: 1, alias: tag
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
				] : h('h1', tag, h('sup', collection.length)),
			this.rss(data),
			h('ol.entry-list', {reversed: 'reversed'},
				collection.slice().reverse().map(en =>
					h('li', entry(data, en, {processExcerpt: this.markdown}))
				)
			)
		]
	}

	rss(data) {
		return h('p', 'RSS: ', h('code',
			`https://www.denizaksimsek.com/feed/${tag !== 'all' ? tag+'/' : ''}feed.rss`)
		)
	}
}

{%set collection = collections[tag]%}

{%if tag == 'all'%}

<h1>Archive</h1>

<p><b>By tag:</b> {%set tags = collections|keys%}{%include "partials/tags.njk"%}

{%else%}

<h1>{{tag}}<sup>{{collection.length}}</sup></h1>

{%endif%}

<p>RSS: <code>https://www.denizaksimsek.com/feed/{%if tag != 'all'%}{{tag}}/{%endif%}feed.rss</code>

<ol reversed class="entry-list">

{%for entry in collection|reverse%}
<li> {%include 'partials/entry.njk'%}
{%endfor%}

</ul>
