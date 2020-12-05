
const h = require('hyperscript')
const moment = require('moment')
const tagList = require('./partials/tag-list.11ty.js')

module.exports = class {
	data() {
		return {
			layout: 'layout'
		}
	}

	render(data) {
		const {page, title, uPhoto, content, tags, collections} = data
		return h('article.h-entry',
			h('link.u-photo', {href: uPhoto}),
			h('header',
				h('h1.p-name', title),
				h('a.u-url', {href: page.url}, dtPublished(page.date))
			),
			
			this.otherLanguageLink(data),

			h('div.e-content', {innerHTML: content}),

			tagList(tags, collections),
			this.readNext(data),
			this.syndication(data),
			this.comments(data),
		).outerHTML
	}

	otherLanguageLink(data) {
		if ('english' in data) return h('p', a('English', data.english))
		if ('türkçe' in data) return h('p', a('Türkçe', data.türkçe))
	}

	readNext({collections, page, tags}) {
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
			h('span.postlabel', 'Read next: '),
			"TODO port entry partial",
		)
	}

	syndication({page, devToSyndication}) {
		return h('section.syndication-links',
			a('DEV Community', devToSyndication[page.url], {className: 'u-syndication'})
		)
	}

	comments(data) {
		return h('section.comments-section',
			h('h2', 'Comments'),
			this.commentForm(data),
			h('small', data.lang == 'tr' ?
				'Yorumunuzu istediğiniz gibi imzalayın.' :
				'Sign your comment however you want.'),
			h('hr'),
			this.commentList(data.comments[data.page.url])
		)
	}

	commentForm(data, replyTo) {
		const {lang, page: {url}} = data
		return h('form.comments-form', {
			netlify: 'netlify',
			name: 'Comments',
			'netlify-honeypot': 'robotuz-eyvallah',
			action: '/did-comment',
			method: 'POST',
		}, [
			h('input', {name: 'path', type: 'hidden', value: data.page.url}),
			h('input', {name: 'robotuz-eyvallah', type: 'hidden'}),
			h('input', {name: 'reply', type: 'hidden'}),

			h('label', {htmlFor: 'contents'}, 'Post a comment'),
			h('textarea.commentinput', {name: 'contents', required: 'required', rows: 4}),

			h('input.submit', {type: 'submit', value: 'Submit'}),
		])
	}

	commentList(data, comments, replyTo) {
		if (!comments) return []
		return h('ol.commentslist', {reversed: 'reversed'},
			comments.where(comment => comment.replyTo === replyTo)
				.map(comment => this.comment(data, comment))
		)
	}

	comment(data, comment) {
		return h('li',
			h('blockquote.unblockquote', {innerHTML: basicFormatting(comment.contents)}),
			h('p.metadata',
				h('time.dt-published', moment(date).format('DD/MM/YYYY HH.mm'))
			),
			comment.replies && comment.replies.length > 0 &&
				this.commentList(comment.replies.where(reply => reply.reply === comment.date)),

			h('details', h('summary.metadata', 'Reply...'),
				this.commentForm(data, moment(comment.date).utcOffset('Z').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'))
			)
		)
	}
}

function a(content, href, attrs = {}) {
	return h('a', {href: href, ...attrs}, content)
}

function dtPublished(date) {
	return h('time.dt-published', moment(date).format('DD/MM/YYYY'))
}