
const h = require('hyperscript')
const webmention = require('./webmention.11ty.js')
const { escape: encodeURIComponent } = require('querystring')

const aboutWm = "https://indieweb.org/Webmention"

function commentparade(pageUrl) {
	return h('a', { href: `https://quill.p3k.io/?dontask=1\
&me=https://commentpara.de\
&reply=https%3a%2f%2fwww.denizaksimsek.com${encodeURIComponent(pageUrl)}` }, 'commentpara.de')
}

function accepts(data) {
	return h('p', 'This website accepts ', h('a', { href: aboutWm }, 'Webmentions'), '.',
		'Send one from your site, or anonymously from ', commentparade(data.page.url), '.')
}

module.exports = function render(data) {
	const { webmentions: { [data.page.url]: wms } } = data

	if (!wms || wms.length < 1) return accepts(data)

	return h('section.webmentions',
		h('h2', `Mentions (${wms.length})`),
		accepts(data),
		h('ol.webmentions-list', { reversed: 'reversed' },
			wms.map(wm => h('li', webmention(data, wm)))
		)
	)
}
