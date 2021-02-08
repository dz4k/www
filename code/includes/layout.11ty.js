
const h = require('hyperscript')

module.exports = class {
  data() {
    return { layout: 'base' }
  }

  render(data) {
    const {page, content, lang} = data
    const intl = data.intl.for(data.lang)

    return h('div',
      h('main', {innerHTML: content}),
      h('footer.site-footer',
        h('div', {innerHTML: intl.footer_message}),
        h('p', {innerHTML: `&copy; 2020 <a class="h-card" href="/">Deniz Akşimşek</a>`})
      )
    ).outerHTML
  }
}
