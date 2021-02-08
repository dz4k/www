
const h = require('hyperscript')
const { escape: encodeURIComponent } = require('querystring')

const aboutWmUrl = "https://indieweb.org/Webmention"

function commentparade(pageUrl) {
	return h('a', { href: `https://quill.p3k.io/?dontask=1\
&me=https://commentpara.de\
&reply=https%3a%2f%2fwww.denizaksimsek.com${encodeURIComponent(pageUrl)}` }, 'commentpara.de')
}

function webmention	(data, wm) {
	const intl = data.intl.for(data.lang)

	return h(`article.webmention.h-cite#wm-${wm['wm-id']}`,
		h('.metadata',
			wm.author ? h('span.p-author.h-card',
				h('a.u-url', {
					href: wm.author.url, rel: 'noopener noreferrer', target: '_blank'
				},
					wm.author.name)
				) : h('em', intl.anonymous),

			', ',

			h('a.u-url', {
				href: wm.url, rel: 'noopener noreferrer', target: '_blank'
			},
				h('time.dt-published', { datetime: wm.published }, 
					moment(wm.published || wm['wm-received']).format('DD/MM/YYYY HH.mm'),
				),
				' (link)',
			),
		),

		h('blockquote.unblockquote.p-content', { innerHTML: wm.content.html }, wm.content.text)
	)
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
