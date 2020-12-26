
const h = require('hyperscript')
const entry = require('../includes/partials/entry.11ty.js')

module.exports = class {
  data() {
    pagination: {
      data:'',
      size: 1,
      alias: 'interaction',
      before: data => [...data.like, ...data.repost]
        .sort((a, b) => b.date - a.date).reverse()
    }
  }

  render(data) {
  	return h('',
  		h('h1', 'Interactions'),
  		data.collections.interactions.map(ixn => entry(data, ixn, {
  			processExcerpt: this.markdown
  		}))
  	)
  }
}