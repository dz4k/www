
const fetch = require('node-fetch')

const mockComments = {
	"/2020/ordu-street-sign/": [
		{
			date: "20200930T100000Z",
			contents: "I love this picture -- alexius",
			replies: []
		},
		{
			date: "20200930T103000Z",
			contents: "I agree with you alexius,\n\nthis is amazing(tm) -- twitter.com/EfixGG https://twitter.com/EfixGG",
			reply: "20200930T100000Z",
			replies: []
		},
		{
			date: "20200930T110000Z",
			contents: `Hello!
This is me testing comment formatting.

-- (c) (r) (tm) <= <- -> => ....... "Hello!" \`code\` <img src=x onerror="alert('xss')">`,
			replies: []
		}
	]
}

module.exports = async () => {
	const apiKey = process.env.NETLIFY_API_KEY
	const formId = process.env.COMMENTS_FORM_ID

	let rv

	if (!(apiKey && formId)) {
		rv = mockComments
	} else {
		const url = `https://api.netlify.com/api/v1/forms/${formId}/submissions/?access_token=${apiKey}`

		comments = await fetch(url).then(res => res.json())
			.catch(e => mockComments)

		console.log(comments)

		if (!(comments instanceof Array)) return {}
	
		rv = {}
		for (let comment of comments.reverse()) {
			const arr = rv[comment.data.path] || (rv[comment.data.path] = [])
			
			const commentModel = {
				date: comment.created_at,
				contents: comment.data.contents,
				reply: comment.data.reply,
				replies: []
			}

			arr.unshift(commentModel)
		}
	}


	for (const path in rv) for (const commentModel of rv[path]) {
		const arr = rv[path]
		if (commentModel.reply) {
			// TODO: this should be a binary search
			const repliedComment = arr.find(existingCommentModel => 
					existingCommentModel.date === commentModel.reply)
			repliedComment && repliedComment.replies.push(commentModel)
		}
	}

	console.log(rv)

	return rv
}