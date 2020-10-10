---
title: 'Navigation'
permalink: '/nav/'
layout: 'base'
eleventyComputed:
	topTags:
		({collections}) -> 
			Object.entries(collections)
				.filter ([key, val]) -> key not in ['all', 'post']
				.sort ([_,a], [__,b]) -> b.length - a.length
				.map ([key, val]) -> key
				.slice 0, 4
# eleventyExcludeFromCollections: yes
---

<div><button class="menu-link" onclick="history.back()">Close</button><div>
<main>
<nav class="nav-page">

# Navigation

- [Home](/)
- [Posts](/archive/)
	+ By tag: {%for coll in topTags-%}
			[{{coll}}](/archive/{{coll}}/){{', ' if not loop.last}}
		{%-endfor%}
- [Links](/links/)
	+ [Blogroll](/links/#blogroll)
	+ [Bookmarks](/links/#bookmarks)
- [Search](/search/)

## Me Elsewhere

- [Twitter](https://twitter.com/DenizAksimsek)
- [GitHub](https://github.com/DenizAksimsek)
- [DEV](https://dev.to/DenizAksimsek)

## My Other Sites

- [Ankara Railway Map](https://ankarametro.denizaksimsek.com/)
- [Public Folder](https://public.denizaksimsek.com/)
- [Cats](https://cats.denizaksimsek.com/)

</nav>
</main>