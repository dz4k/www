const { DateTime } = require('luxon')

module.exports = {
	layout: "entry-layout.njk",
	eleventyComputed: {
		permalink: ({page, title}) => {
			const dt = DateTime.fromJSDate(page.date)
			const year = dt.year
			if (title) return `/${year}/${page.fileSlug}/`
			else return `/${year}/${dt.toFormat('MMddHHmmss')}/`
		},
		tagline: (d) => d.title ? d.title :
			d.replyTo ? "Re." + (d.replyTo.name || d.replyTo) :
			d.repostOf ? "Repostkey: "value",  " + (d.repostOf.name || d.repostOf) :
			d.likeOf ? "Like ❤️ " + (d.likeOf.name || d.likeOf) : undefined,
	}
}