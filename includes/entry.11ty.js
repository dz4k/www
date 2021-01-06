
const h = require('hyperscript')
const moment = require('moment')

const tagList = require('./partials/tag-list.11ty.js')
const entry = require('./partials/entry.11ty.js')
const webmentions = require('./partials/webmentionlist.11ty.js')

module.exports = class {
	data() {
		return {
			layout: 'layout'
		}
	}

	render(data) {
		const {page, title, uPhoto, content, tags, collections} = data
		this.intl = data.intl.for(data.lang)
		const processExcerpt = this.markdown

		if ('excerpt' in page) excerpt = processExcerpt(page.excerpt)
		if ('excerpt' in data) excerpt = processExcerpt(data.excerpt)
		excerpt = striptags(excerpt || '')

		return h('article.h-entry',
			h('link.u-photo', {href: uPhoto}),
			
			h('header',
				'likeOf' in data ? h('p',
					'❤ ',
					h('a.u-like-of', {href: data.likeOf}, data.likeOf),
				) : [],
				

				'repostOf' in data ? h('p',
					this.intl.repost_of,
					h('a.u-repost-of', {href: data.repostOf}, data.repostOf),
				) : [],

				'replyTo' in data ? h('p',
					this.intl.reply_to,
					h('a.u-reply-to', {href: data.replyTo}, data.replyTo),
					'replyCtx' in data ? h('blockquote', data.replyCtx) : [],
				) : [],

				h('h1.p-name', title),
				h('a.u-url', {href: page.url}, dtPublished(page.date))
			),
			
			this.otherLanguageLink(data),

			h('div.e-content', {innerHTML: content}),

			tagList(tags, collections),
			this.readNext(data),
			this.syndication(data),
			webmentions(data),
		).outerHTML
	}

	otherLanguageLink(data) {
		if ('english' in data) return h('p', a('English', data.english))
		if ('türkçe' in data) return h('p', a('Türkçe', data.türkçe))
	}

	readNext(data) {
		const {collections, page, tags} = data
		let coll
		for (const tag in tags) {
			if (collections[tag] && collections[tag].length > 1) {
				coll = collections[tag]
				break
			}
		}
		coll || (coll = collections.all)

		const idx = coll.findIndex(entry => entry.inputPath === page.inputPath)
		const entryToRead = coll[idx + 1] || coll[0]

		return h('div.read-next', {
			onclick: `event.target.closest('.read-next a') == null &&
				this.querySelector('.u-url').click()})`,
			},
			entry(data, entryToRead, {beforeTitle: this.intl.read_next_colon, processExcerpt}),
		)
	}

	syndication({page, devToSyndication}) {
		return h('section.syndication-links',
			page.url in devToSyndication ?
				a('DEV: '+devToSyndication[page.url], devToSyndication[page.url],
					{className: 'u-syndication'}) : ''
		)
	}
}

function a(content, href, attrs = {}) {
	return h('a', {href, ...attrs}, content)
}

function dtPublished(date) {
	return h('time.dt-published', moment(date).format('DD/MM/YYYY'))
}