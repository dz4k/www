const { DateTime } = require('luxon')

module.exports = {
	layout: "entry.11ty.js",
	eleventyComputed: {
		permalink: ({page}) => `/${DateTime.fromJSDate(page.date).year}/${page.fileSlug}/`
	}
}