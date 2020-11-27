---
title: 'Deniz Akşimşek'
layout: 'layout'
permalink: 'index.html'
eleventyExcludeFromCollections: true
style: """
    .picture-of-me {
        display: block;
        width: 10ch;
        height: auto;
        margin: 3em 1em 2em auto;
        transform: rotateZ(5deg);
        padding: 1ch;
        box-shadow: .1em .5em .5em 0 #888, 0 0 .2em 0 #888;
        background: white;
    }
    """
---

{%assign latestEntries = collections.post|reverse|slice:0, 4%}


![A picture of me](/assets/me.jpeg){.picture-of-me width=120 height=120 sizes=120px}

I am **Deniz**, a person. I'm into [web development], [programming languages] and [design]. Though I'm not a photographer by any means, I often find myself near [nice landscapes] and [cats].


I'm currently studying Computer Engineering at [TEDU] in Ankara, Turkey.

## Blog

On occasion, I write blogposts, sometimes in Turkish. Here are the last few:

{%for entry in latestEntries%}
- <time>{{entry.date|moment: 'DD/MM'}}</time> [{{entry.data.title}}]({{entry.url|url}})
{%-endfor%}
- [_and more..._](/archive/)

## Elsewhere

Other than this website, I am occasionally found on [Twitter]{rel=me} and [DEV]{rel=me}. If you need to contact me though, I'd much prefer if you [email me]{rel=me}. I also have a [GitHub]{rel=me} account.

* * *

## Ankara Railway Map

I made a thing. It's a map of urban railways in Ankara. It lives on <https://ankarametro.denizaksimsek.com> and it's way better than the official one.

--- Deniz Akşimşek <<d.aksimsek1@outlook.com>> {style="text-align: end"}

[web development]:        /archive/website/
[programming languages]:  /archive/pl/
[design]:                   /archive/design/
[nice landscapes]:        /archive/place/
[cats]:                   //cats.denizaksimsek.com
[TEDU]:                   //www.tedu.edu.tr/
[Links]:                  /links/
[Twitter]:                //twitter.com/DenizAksimsek/
[DEV]:                    //dev.to/dza/
[email me]:               mailto:dza@denizaksimsek.com
[GitHub]:                 //github.com/DenizAksimsek/
