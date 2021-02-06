
const h = require('hyperscript')

const styles = Object.values(
  require('@cloudcmd/read-files-sync')('./includes/styles')
)

module.exports = class {
  render(data) {
    return '<!doctype html>' + this._render(data).outerHTML
  }

  _render(data) {
    return h('html', {lang: 'en'},
      this.head(data),
      this.body(data),
    )
  }

  head(data) {
    const {title} = data

    return h('head',
      h('meta', {charset: 'UTF-8'}),
      h('title', title || 'Deniz Akşimşek'),
      this.viewport(data),
      this.indieauth(data),
      this.webmention(data),
      this.theme(data),
      this.cards(data),
      this.preloadFonts(data),
      this.styles(data),
    )
  }

  body(data) {
    return h('body', {innerHTML: data.content}, 
      h('script', {innerHTML: /*js*/`
        addEventListener('keyup',e => {
          if (e.shiftKey) {
            switch (e.keyCode) {
              case 69: // E
                window.location = 'https://github.com/DenizAksimsek/www/edit/main/${data.page.inputPath}'
                break
            }
          }
        })
      `})
    )
  }

  viewport() {
    return h('meta', {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0'
    })
  }

  indieauth(data) {
    return [
      h('link', {rel: 'authorization_endpoint', href: 'https://indieauth.com/auth'}),
      h('link', {rel: 'token_endpoint', href: 'https://tokens.indieauth.com/token'}),
    ]
  }

  webmention(data) {
    return [
      h('link', { rel: "webmention",  href: "https://webmention.io/www.denizaksimsek.com/webmention" }),
      h('link', { rel: "pingback", href: "https://webmention.io/www.denizaksimsek.com/xmlrpc" }),
    ]
  }

  theme(data) {
    return [
      h('meta', {name: 'mobile-web-app-capable',                content: 'yes'}),
      h('meta', {name: 'apple-mobile-web-app-capable',          content: 'yes'}),
      h('meta', {name: 'application-name',                      content: 'Deniz A.'}),
      h('meta', {name: 'apple-mobile-web-app-title',            content: 'Deniz A.'}),
      h('meta', {name: 'theme-color',                           content: '#ff6600'}),
      h('meta', {name: 'msapplication-navbutton-color',         content: '#ff6600'}),
      h('meta', {name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent'}),
      h('meta', {name: 'msapplication-starturl',                content:       '/'}),


      ...['icon', 'apple-touch-icon'].map(rel => h('link', {
        rel,
        type: 'image/svg+xml',
        sizes: '512x512',
        href: '/assets/favicon.svg'
      })),
    ]
  }

  cards(data) {
    const {title, page: {url}, uPhoto} = data
    return [
      h('meta', {property: 'og:title', content: title}),
      h('meta', {property: 'og:url', content: `https://denizaksimsek.com${url}`}),
      h('meta', {property: 'og:type', content: 'article'}),
      uPhoto && h('meta', {property: 'og:image', content: `https://www.denizaksimsek.com${uPhoto}`}),
      h('meta', {name: 'twitter:card', content: uPhoto ? 'summary_large_image' : 'summary'}),
      h('meta', {name: 'twitter:site', content: '@DenizAksimsek'}),
      h('meta', {name: 'twitter:creator', content: '@DenizAksimsek'}),
    ]
  }

  preloadFonts(data) {
    const fonts = [
      '/assets/fonts/Atkinson-Hyperlegible-Regular-102.woff',
      // '/assets/fonts/Atkinson-Hyperlegible-Italic-102.woff',
      '/assets/fonts/Atkinson-Hyperlegible-Bold-102.woff',
      // '/assets/fonts/Atkinson-Hyperlegible-BoldItalic-102.woff',
    ]
    return fonts.map(font => h('link', {
      rel: 'preload',
      attrs: { as: 'font', crossorigin: 'anonymous' }, // maybe hyperscript was a mistake...
      href: font,
    }))
  }

  styles(data) {
    return [
      styles.map(sty => h('style', {innerHTML: sty})),
      'style' in data ? h('style', {innerHTML: data.style}) : '',
    ]
  }
}
