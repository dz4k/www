
const h = require('hyperscript')
const webmention = require('./webmention.11ty.js')

module.exports = function render(data) {
	const { webmentions: { [data.page.url]: wms } } = data

	if (!wms || wms.length < 1) return ''

	return h('section.webmentions',
		h('h2', `Mentions (${wms.length})`),
		h('ol.webmentions-list', { reversed: 'reversed' },
			wms.map(wm => h('li', webmention(data, wm)))
		)
	)
}
