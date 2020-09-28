
const fetch = require('node-fetch')

function makeRelativeUrl(url) {
	const urlObj = new URL(url)
	return urlObj.pathname
}

module.exports = fetch('https://dev.to/api/articles?username=dza')
    .then(res => res.json())
    .then(articles => articles.map(
        ({canonical_url, url}) => [makeRelativeUrl(canonical_url), url]))
    .then(Object.fromEntries)
