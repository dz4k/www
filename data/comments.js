
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
		},
		{
			date: "20200930T110000Z",
			contents: `Hello!
This is me testing comment formatting.

-- (c) (r) (tm) <= <- -> => ....... "Hello!" \`code\` <img src=x onerror="alert('xss')">`
		}
	]
}

module.exports = async () => {
	const apiKey = process.env.NETLIFY_API_KEY
	const formId = process.env.COMMENTS_FORM_ID
	if (!(apiKey && formId)) {
		return mockComments
	}

	const url = `https://api.netlify.com/api/v1/forms/${formId}/submissions/?access_token=${apiKey}`

	const comments = await fetch(url).then(res => res.json())
		.catch(e => mockComments)

	console.log(comments)

	if (!(comments instanceof Array)) return {}

	const rv = {}
	for (let comment of comments) {
		const arr = rv[comment.data.path] || (rv[comment.data.path] = [])
		
		const commentModel = {
			date: comment.created_at,
			contents: comment.data.contents,
			reply: comment.data.reply,
			replies: []
		}

		if ('reply' in comment.data) {
			// TODO: this should be a binary search
			arr
				.find(existingCommentModel => 
					existingCommentModel.date === comment.data.reply)
				.replies.push(commentModel)
		}

		arr.push(commentModel)
	}

	console.log(rv)

	return rv
}