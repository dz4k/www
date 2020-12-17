
const h = require('hyperscript')
const webmention = require('./webmention.11ty.js')

module.exports = function render(data) {
	const { webmentions: { [data.page.url]: wms } } = data

	if (!wms) return ''

	return h('section.webmentions',
		h('h2', wms.length, ' mentions'),
		h('ol.webmentions-list', { reversed: 'reversed' },
			wms.map(wm => h('li', webmention(data, wm)))
		)
	)
}
