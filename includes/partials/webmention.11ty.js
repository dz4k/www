
const h = require('hyperscript')
const moment = require('moment')

module.exports = function render(data, wm) {
	console.log(wm.content)
	return h(`article.webmention.h-cite#wm-${wm['wm-id']}`,
		h('.metadata',
			wm.author ? h('span.p-author.h-card',
				h('a.u-url', {
					href: wm.author.url, rel: 'noopener noreferrer', target: '_blank'
				},
					wm.author.name)
				) : h('em', 'Anonymous'),

			', '

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