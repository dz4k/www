
module.exports = {
	topTags(collections) {
		return Object.entries(collections)
			.filter(([key, val]) => key !== 'all' && key !== 'post')
			.sort(([_,a], [__,b]) => b.length - a.length)
			.map(([key, val]) => key)
			.slice(0, 4)
	}
}