
module.exports = {
	layout: "entry",
	eleventyComputed: {
		interaction: data => {
			for (const t of data.interactionTypes) {
				if (t.type in data) {
					return Object.assign({}, t, data[t.type])
				}
			}
		}
	}
}

