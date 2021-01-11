
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
        h('a.h-card', {href: '/'},
          h('img.p-name', {
            alt: 'Deniz Akşimşek', src: '/assets/logo.png', get title() { return this.alt },
            width: 62, height: 34,
            style: { 'image-rendering': 'crisp-edges', 'width': '93px', 'height': '51px' },
          }),
        ),
      ),
      h('main', {innerHTML: content}),
      h('footer.site-footer',
        h('div', {innerHTML: intl.footer_message}),
        h('p', {innerHTML: `&copy; 2020 <a class="h-card" href="/">Deniz Akşimşek</a>`})
      )
    ).outerHTML
  }
}
