---
title: 'Deniz Akşimşek'
layout: 'layout'
permalink: 'index.html'
eleventyExcludeFromCollections: true
style: """
    .picture-of-me {
        display: block;
        box-sizing: content-box;
        width: 100px;
        height: 100px;
        margin: 2em 0;
        transform: rotateZ(5deg);
        padding: 1ch 1ch 2ch 1ch;
        box-shadow: .1em .5em .5em 0 #000, 0 0 .2em 0 #000;
        background: #eee;
    }
    .put-in-box {
        border: 1px solid var(--primary);
        padding: 1em;
    }
    .put-in-box:first-child { margin-top: 0 }
    .put-in-box:la
    st-child { margin-bottom: 0 }
    """
---

{%assign latestEntries = collections.posts|reverse|slice:0, 4%}

<div class=h-card>
<a rel=me href=https://denizaksimsek.com/>

![Deniz Akşimşek](/assets/me.jpeg){.picture-of-me .u-photo .p-name width=120 height=120 sizes=120px}

</a></div>

I am **Deniz**, a person. I'm into [web development], [programming languages] and [design]. Though I'm not a photographer by any means, I often find myself near [nice landscapes] and [cats].


I'm currently studying Computer Engineering at [TEDU] in Ankara, Turkey.

## Blog

On occasion, I write blogposts, sometimes in Turkish. Here are the last few:

{%for entry in latestEntries%}
- <time>{{entry.date|moment: 'DD/MM'}}</time> [{{entry.data.title}}]({{entry.url|url}})
{%-endfor%}
- [and more...](/archive/)

## Elsewhere

Other than this website, I am occasionally found on [Twitter]{rel=me} and [DEV]{rel=me}. If you need to contact me though, I'd much prefer if you [email me]{rel=me}. I also have a [GitHub]{rel=me} account.

--- Deniz Akşimşek <<deniz@denizaksimsek.com>> {style="text-align: end"}

<div class="put-in-box">

## Ankara Railway Map

I made a thing. It's a map of urban railways in Ankara. It lives on <https://ankarametro.denizaksimsek.com> and it's way better than the official one.

</div>


[web development]:        /archive/website/
[programming languages]:  /archive/pl/
[design]:                 /archive/design/
[nice landscapes]:        /archive/place/
[cats]:                   //cats.denizaksimsek.com
[TEDU]:                   //www.tedu.edu.tr/
[Links]:                  /links/
[Twitter]:                //twitter.com/DenizAksimsek/
[DEV]:                    //dev.to/dza/
[email me]:               mailto:deniz@denizaksimsek.com
[GitHub]:                 //github.com/DenizAksimsek/
