
const fetch = require('node-fetch')

const mockComments = {
	"/2020/ordu-street-sign/": [
		{
			date: "20200930T100000Z",
			contents: "I love this picture -- alexius"
		},
		{
			date: "20200930T103000Z",
			contents: "I agree with alexius,\n\nthis is amazing(tm) -- twitter.com/EfixGG https://twitter.com/EfixGG"
		}
	]
}

module.exports = async () => {
	if (!('NETLIFY_API_KEY' in process.env)) return mockComments

	const apiKey = process.env.NETLIFY_API_KEY
	const formId = process.env.COMMENTS_FORM_ID

	const url = `https://api.netlify.com/api/v1/forms/${formId}/submissions/?access_token=${apiKey}`

	const comments = await fetch(url).then(res => res.json())

	console.log(comments)

	if (!(comments instanceof Array)) return {}

	const rv = {}
	for (let comment of comments) {
		const arr = rv[comment.data.path] || (rv[comment.data.path] = [])
			
		arr.push({
			date: comment.created_at,
			contents: comment.data.contents
		})
	}

	console.log(rv)

	return rv
}