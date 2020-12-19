
const h = require('hyperscript')
const webmention = require('./webmention.11ty.js')
const { escape: encodeURIComponent } = require('querystring')

const aboutWmUrl = "https://indieweb.org/Webmention"

function commentparade(pageUrl) {
	return h('a', { href: `https://quill.p3k.io/?dontask=1\
&me=https://commentpara.de\
&reply=https%3a%2f%2fwww.denizaksimsek.com${encodeURIComponent(pageUrl)}` }, 'commentpara.de')
}

module.exports = function render(data) {
	const { webmentions: { [data.page.url]: wms } } = data
	const intl = data.intl.for(data.lang)

	if (!wms || wms.length < 1) return h('p',
		intl.this_website_accepts_webmentions(
			aboutWmUrl, commentparade(data.page.url)))

	return h('section.webmentions',
		h('h2', `Mentions (${wms.length})`),
		h('p', intl.this_website_accepts_webmentions(
			aboutWmUrl, commentparade(data.page.url))),
		h('ol.webmentions-list', { reversed: 'reversed' },
			wms.map(wm => h('li', webmention(data, wm)))
		)
	)
}
