const fetch = require('node-fetch')

const urls = [
	// Google Fonts: IBM Plex Sans Condensed
  'https://fonts.googleapis.com/css2?' + 
  'family=IBM+Plex+Sans+Condensed:ital,wght@0,400;0,700;1,400;1,700' + 
  '&display=swap&subset=latin,latin-ext',
  // Prism syntax theme: VS
  'https://unpkg.com/prism-themes@1.4.0/themes/prism-vs.css'
]

module.exports = Promise.all(
	urls.map(url => fetch(url).then(res => res.text()))
)
