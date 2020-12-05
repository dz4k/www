
const h = require('hyperscript')
const moment = require('moment')
const tagList = require('./tag-list.11ty.js')

// this is the most horrifying function signature ever
module.exports = function({collections}, entry, {beforeTitle} = {}) {
	return h('article.h-entry',
		h("p",
			beforeTitle, h('a.p-name.u-url', {href: entry.url}, entry.data.title)
		),
		h('time.dt-published', moment(entry.date).format('DD/MM/YYYY')),
		entry.data.page.excerpt ? h('p.p-summary',
			{innerHTML: this.markdown(entry.data.page.excerpt)}) : '', // striptags?
		h('p', tagList(entry.data.tags, collections)),
	)
}
