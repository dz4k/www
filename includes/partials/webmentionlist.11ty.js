
const h = require('hyperscript')
const webmention = require('./webmention.11ty.js')
const { escape: encodeURIComponent } = require('querystring')

const aboutWm = "https://indieweb.org/Webmention"

function commentparade() {
	return h('a', { href: `https://quill.p3k.io/?dontask=1\
&me=https://commentpara.de\
&reply=https%3a%2f%2fwww.denizaksimsek.com%2f${encodeURIComponent(pageUrl)}` }, 'commentpara.de')
}

https://quill.p3k.io/?dontask=1&me=https://commentpara.de&reply=https%3a%2f%2fjlelse.blog%2fthoughts%2f2020%2f12%2f2020-12-18-nnzkc

module.exports = function render(data) {
	const { webmentions: { [data.page.url]: wms } } = data

	if (!wms || wms.length < 1) return ''

	return h('section.webmentions',
		h('h2', `Mentions (${wms.length})`),
		h('p', 'This website accepts ', h('a', { href: aboutWm }, 'Webmentions'), '.',
		       'Send one from your site, or anonymously from ', commentparade(), '.'),
		h('ol.webmentions-list', { reversed: 'reversed' },
			wms.map(wm => h('li', webmention(data, wm)))
		)
	)
}
