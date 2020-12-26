
const h = require('hyperscript')
const moment = require('moment')
const tagList = require('./tag-list.11ty.js')
const striptags = require('../helpers/striptags')

// this is the most horrifying function signature ever
module.exports = function({collections}, entry, {beforeTitle, processExcerpt} = {}) {

	let excerpt
	if (collections.interactions.contains(entry)) excerpt = entry.templateContent
	else if ('excerpt' in entry.data.page) excerpt = processExcerpt(entry.data.page.excerpt)
	else if ('excerpt' in entry.data) excerpt = processExcerpt(entry.data.excerpt)
	excerpt = striptags(excerpt || '')

	return h('article.h-entry',
		h("p",
			beforeTitle, h('a.p-name.u-url', {href: entry.url}, entry.data.title),
			' ',
			h('time.dt-published', moment(entry.date).format('DD/MM/YYYY')),
		),

		'likeOf' in entry.data ? h('p',
			'❤ ',
			h('a.u-like-of', {href: entry.data.likeOf}, entry.data.likeOf),
		) : [],
		

		'repostOf' in entry.data ? h('p',
			'Reposted ',
			h('a.u-repost-of', {href: entry.data.repostOf}, entry.data.repostOf),
		) : [],

		'replyTo' in entry.data ? h('p',
			data.intl.for(entry.data.lang).reply_to,
			h('a.u-reply-to', {href: entry.data.replyTo}, entry.data.replyTo),
			'replyCtx' in entry.data ? h('blockquote', entry.data.replyCtx) : [],
		) : [],

		entry.data.page.excerpt ? h('p.p-summary',
			{innerHTML: excerpt}) : [],
		h('p', tagList(entry.data.tags, collections)),
	)
}

