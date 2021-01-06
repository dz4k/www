const fetch = require('node-fetch')

const urls = [
  // Prism syntax theme: VS
  'https://unpkg.com/prism-themes@1.4.0/themes/prism-a11y-dark.css'
]

module.exports = Promise.all(
	urls.map(url => fetch(url).then(res => res.text()))
)
