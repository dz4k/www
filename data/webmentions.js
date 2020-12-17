
const fetch = require('node-fetch')

const url = `https://webmention.io/api/mentions.jf2?\
domain=www.denizaksimsek.com&\
token=${process.env.WEBMENTION_IO_TOKEN}`

function groupByPage(wmData) {
	const rv = {}
	for (const wm of wmData.children) {
		const relUrl = relativeUrl(wm['wm-target'])
		(rv[relUrl] || rv[relUrl] = []).push(wm)
	}
	return rv
}

module.exports = () =>
	fetch(url).then(res => res.json())
		.then(data => groupByPage(data))
		.catch(e => ({}))
