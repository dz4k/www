
const h = require('hyperscript')
const entry = require('../includes/partials/entry.11ty.js')

module.exports = class {
  data() {
    return {
    	pagination: {
	      data: 'collections.interactions',
	      size: 1,
	      alias: 'interaction',
    	}
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