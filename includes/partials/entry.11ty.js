
const h = require('hyperscript')
const moment = require('moment')

// this is the most horrifying function signature ever
module.exports = function({collections}, entry, {beforeTitle} = {}) {

	return h('article.h-entry',
		h("span",
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
	)
}

