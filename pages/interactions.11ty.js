
const h = require('hyperscript')
const entry = require('../includes/partials/entry.11ty.js')

module.exports = class {
  data() {
    return {
    	pagination: {
	      data: 'collections.interactions',
	      size: 1,
	      alias: 'interaction',
    	},
	permalink: data => `/interactions/${data.interaction.data.page.fileSlug}/`
    }
  }

  render(data) {
  	return h('div',
  		h('h1', 'Interactions'),
  		data.collections.interactions.map(ixn => entry(data, ixn, {
  			processExcerpt: this.markdown
  		}))
  	)
  }
}
