const { DateTime } = require('luxon')

module.exports = {
	layout: "entry-layout.njk",
	eleventyComputed: {
		permalink: ({page}) => `/${DateTime.fromJSDate(page.date).year}/${page.fileSlug}/`
	}
}