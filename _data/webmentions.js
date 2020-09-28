const fetch = require('node-fetch')
const url = require('url')

const isLocalDev = process.env.LOCAL_DEV && 
    process.env.LOCAL_DEV.split(" ")
      .includes("www.denizaksimsek.com")

const webmentionsUrl = "https://webmention.io/api/mentions.jf2?domain=www.denizaksimsek.com&token=i7fJySkFJ6n0w3PvNFDIgw"

function groupByTarget(mentions) {
	mentions = mentions.children

	const rv = {all: []}

	for (const mention of mentions) {
		rv.all.push(mention)
		const target = getTarget(mention)
		const group = rv[target] || (rv[target] = [])
		group.unshift(mention)
	}

	return rv
}

function getTarget(mention) {
	return url.parse(mention[mention['wm-property']]).path
}

module.exports = () => isLocalDev ? { all: [] } : fetch(webmentionsUrl)
    .then(res => res.json())
    .catch(e => ({ children: [] }))
    .then(groupByTarget)
