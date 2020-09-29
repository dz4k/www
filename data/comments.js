
const fetch = require('node-fetch')

module.exports = async () => {
	if (!('NETLIFY_API_KEY' in process.env)) return {}

	const apiKey = process.env.NETLIFY_API_KEY
	const formId = process.env.COMMENTS_FORM_ID

	const url = `https://api.netlify.com/api/v1/forms/${formId}/submissions/?access_token=${apiKey}`

	const comments = await fetch(url).then(res => res.json())

	console.log(comments)

	if (!(comments instanceof Array)) return {}

	const rv = {}
	for (let comment of comments) {
		const arr = comments[comment.path] || (comments[comment.path] = [])
		arr.push({
			date: comment.created_at,
			contents: comment.data.contents
		})
	}

	return rv
}