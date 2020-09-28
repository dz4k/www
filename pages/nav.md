---
title: Navigation
permalink: /nav/
layout: base
# eleventyExcludeFromCollections: yes
---
<div><button class="menu-link" onclick="history.back()">Close</button><div>
<main>
<nav class="nav-page">

# Navigation

- [Home](/)
- [Posts](/archive/)
	+ By tag: {%for coll in functions.topTags(collections)-%}
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