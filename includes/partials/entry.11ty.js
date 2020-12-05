
const h = require('hyperscript')
const moment = require('moment')
const tagList = require('./tag-list.11ty.js')

// this is the most horrifying function signature ever
module.exports = function({collections}, entry, {beforeTitle, processExcerpt} = {}) {
	return h('article.h-entry',
		h("p",
			beforeTitle, h('a.p-name.u-url', {href: entry.url}, entry.data.title),
			h('time.dt-published', moment(entry.date).format('DD/MM/YYYY')),
		),
		
		entry.data.page.excerpt ? h('p.p-summary',
			{innerHTML: striptags(processExcerpt(entry.data.page.excerpt))}) : '',
		h('p', tagList(entry.data.tags, collections)),
	)
}

// !!! ONLY USE WITH TRUSTED INPUT !!!
// https://gist.github.com/muhittin/3358070
function striptags(text) {
	return text.replace(/(<([^>]+)>)/ig,"")
}
