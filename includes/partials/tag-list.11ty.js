
const h = require('hyperscript')

module.exports = function(tags, collections) {
	return intersperse(', ', 
		(tags || []).filter(tag => tag != 'all')
			.map(tag =>
				h('a.p-category', {href: `/archive/${tag}`},
					'#', tag, h('sup', collections[tag].length)
				)
			)
		)
}

function intersperse(x, arr) {
	const rv = []
	let first = true
	for (const v of arr) {
		if (!first) {
			rv.push(x)
		}
		first = false
		rv.push(v)
	}
	return rv
}
