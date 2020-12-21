
module.exports = class extends require('./archive.11ty.js') {
  data() {
    return Object.assign(super.data(), {
      lang: 'tr',
      permalink: ({tag: etiket}) => etiket === 'all' ? '/arsiv/' : `/arsiv/${etiket}/`,
      eleventyComputed: {},
    })
  }
}