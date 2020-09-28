---
title: Deniz Akşimşek
layout: layout
permalink: index.html
eleventyExcludeFromCollections: yes
---

{%set tagWeb = collections.website.length%}
{%set tagPlace = collections.place.length%}
{%set latestEntries = (collections.post|sort(true,false,'date')).slice(0, 3)%}


{%include "partials/picture-of-me.md"%}

[ [TR](/tr/) | **EN** ]


I am **Deniz**, a person. I'm into [web development]<sup>{{tagWeb}}</sup>, [programming languages] and visual design. Though I'm not a photographer by any means, I often find myself near [nice landscapes]<sup>{{tagPlace}}</sup> and [cats].


I'm currently studying Computer Engineering at [TEDU] in Ankara, Turkey.

On occasion, I write blogposts, sometimes in Turkish. Here are the last few:

{%for entry in latestEntries%}
- <time>{{entry.date|moment('DD/MM')}}</time> [{{entry.data.title}}]({{entry.url|url}})
{%-endfor%}
- [and more...](/archive/)

I enjoy reading blogposts too. I have a few favorites on my [links] page (blogroll & bookmarks).

Other than this website, I am occasionally found on [Twitter] and [DEV]. If you need to contact me though, I'd much prefer if you [email me]. I also have a [GitHub] account.

***

I made a thing. It's a map of urban railways in Ankara. It lives on <https://ankarametro.denizaksimsek.com> and it's way better than the official one.

--- Deniz Akşimşek <<dza@denizaksimsek.com>>

[web development]:        /archive/website/
[programming languages]:  /archive/pl/
[nice landscapes]:        /archive/place/
[cats]:                   //cats.denizaksimsek.com
[TEDU]:                   //www.tedu.edu.tr/
[links]:                  /links
[Twitter]:                //twitter.com/DenizAksimsek/
[DEV]:                    //dev.to/dza/
[email me]:               mailto:dza@denizaksimsek.com
[GitHub]:                 //github.com/DenizAksimsek/
