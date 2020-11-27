---
title: 'Comments For My Static Blog'
date: '2020-11-18'
tags: ['eleventy','website','netlify']
---

## Preface

This post is about how I added a comment box to my personal blog. It is supposed to serve as documentation for myself, in case it breaks and I forget how it worked in the first place.

## Foundation

I use **[Netlify Forms]** to accept and store comments.

My site is generated with **[Eleventy]**.

## The Form

My comment form is as follows:

```html
<form netlify name="Comments" netlify-honeypot="robotuz-eyvallah"
	action="/did-comment" method="POST" class="comments-form">
	<input name="path" type="hidden" value="{{page.url}}">
	<input name="robotuz-eyvallah" type="hidden">
	<input name="reply" type="hidden">
	<label for="contents">
		{{'Yorum yaz' if lang=='tr' else 'Post a comment'}}
	</label>
	<textarea name="contents" required cols="4" class="commentinput"></textarea>
	<input type="submit" class="submit" 
		value="{{'Gönder' if lang=='tr' else 'Submit'}}">
</form>
```

### What Makes a Comment?

The <dfn>path</dfn> is the URL of the post this comment is under.

The <dfn>reply</dfn> field is the ID of the comment that this comment is a reply to (if any). <mark>Comments are identified by their date and time of submission</mark>, as provided by Netlify.

The <dfn>contents</dfn> field is the comment body. It is subject to some post-processing.

Comments do not have an author field. Commenters are urged to sign their comments. (I do not intend on implementing an account system anytime soon...)

[Netlify Forms]: <!-- TODO -->
[Eleventy]: <!-- TODO -->
