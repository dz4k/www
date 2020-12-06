
module.exports = class {
	data() {
		return {
			permalink: '_redirects',
			eleventyExcludeFromCollections: true,
		}
	}

	render(data) {
		this.redirections(data).map(([from, to]) => `${from}\t${to}\n`).join('')
	}

	redirections(data) {
		return [...this.oldLinks(), this.latest(data)]
	}

	oldLinks() {
		return [
			['/20200902T1254/',	'/2020/css-additional-box-shadow/']
			['/20200827T2005/',	'/2020/ardesen-rize-tr/']
			['/20200826T1523/',	'/2020/road-to-indieweb/']
		]
	}

	latest({collections: {all}}) {
		return ['/latest/', all[all.length - 1]]
	}
}
