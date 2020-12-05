
const h = require('hyperscript')

module.exports = function(tags, collections) {
	return intersperse(',', 
		(tags || []).filter(tag => tag != 'all')
			.map(tag =>
				h('a.p-category', {href: `/archive/${tag}`},
					tag, h('sup', collections[tag].length)
				)
			)
		)
}

function intersperse(x, arr) {
	return arr.reduce((acc, cur) => (acc.push(x, cur), acc), []).shift()
}
