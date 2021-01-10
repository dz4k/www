
const h = require('hyperscript')

module.exports = class {
  data() {
    return { layout: 'base' }
  }

  render(data) {
    const {content, lang} = data
    const intl = data.intl.for(data.lang)

    return h('div',
      h('header.site-header',
        h('strong', h('a.h-card', {href: '/'}, 'Deniz Akşimşek')),
        h('img', { src: '/assets/me.qr.svg', style: {
          float: 'right', width: '14ch', 'margin-right': '.5em'
        } })
       ),
      h('main', {innerHTML: content}),
      h('footer.site-footer',
        h('div', {innerHTML: intl.footer_message}),
        h('p', {innerHTML: `&copy; 2020 <a class="h-card" href="/">Deniz Akşimşek</a>`})
      )
    ).outerHTML
  }
}
