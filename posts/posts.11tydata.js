const { DateTime } = require('luxon')

module.exports = {
	layout: "entry-layout.njk",
	eleventyComputed: {
		permalink: ({page, title}) => {
			const dt = DateTime.fromJSDate(page.date)
			const year = dt.year
			if (title) return `/${year}/${page.fileSlug}/`
			else return `/${year}/${dt.toFormat('MMddHHmmss')}`
		}
	}
}