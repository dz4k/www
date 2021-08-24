
const fetch = require('node-fetch')

const url = `https://webmention.io/api/mentions.jf2?token=${process.env.WEBMENTION_IO_TOKEN}`

function relativeUrl(url) {
	return new URL(url).pathname
}

function groupByPage(wmData) {
	const rv = {}
	for (const wm of wmData.children) {
		const relUrl = relativeUrl(wm['wm-target'])
		rv[relUrl] || (rv[relUrl] = [])
		rv[relUrl].push(wm)
	}
	return rv
}

module.exports = function () {
	if (!('WEBMENTION_IO_TOKEN' in process.env)) return {};
	return fetch(url).then(res => res.json())
		.then(data => groupByPage(data))
		.catch(e => (console.log(e), {}))
}
