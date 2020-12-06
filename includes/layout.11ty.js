
const h = require('hyperscript')

module.exports = class {
  data() {
    return { layout: 'base' }
  }

  render(data) {
    const {content, lang} = data

    return h('div',
      h('header', h('strong', h('a.h-card', {href: '/'}, 'Deniz Akşimşek'))),
      h('main', {innerHTML: content}),
      h('footer.site-footer',
        h('div', {
          innerHTML: lang === 'tr' ? `
            <p> Bu sitedeki tüm tarih/saatler UTC+03 zaman dilimindedir (aksi belirtilmediğinde)
            <p> Bu site <a href="//11ty.dev">Eleventy</a> ve <a href="//netlify.com">Netlify</a> ile yapılmıştır.`
          : `
            <p> All dates/times on this page are UTC+03 unless otherwise specified.
            <p> This website is made with <a href="//11ty.dev">Eleventy</a> and hosted on <a href="//netlify.com">Netlify</a>.`
        }),
        h('p', {innerHTML: `&copy; 2020 <a class="h-card" href="/">Deniz Akşimşek</a>`})
      )
    ).outerHTML
  }
}
