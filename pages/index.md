---
title: 'Deniz Akşimşek'
layout: 'layout'
permalink: 'index.html'
eleventyExcludeFromCollections: true
templateEngineOverride: njk,md
style: >
    .me-elsewhere {
        width: 92vw;
    }
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
    .put-in-box *:first-child { margin-top: 0 }
    .put-in-box *:last-child { margin-bottom: 0 }
---

<div class=h-card>

![Deniz Akşimşek](/assets/me.jpeg){.picture-of-me .u-photo width=120 height=120 sizes=120px}

# [Deniz Akşimşek](https://denizaksimsek.com/){rel=me .p-name .u-url} #

<deniz@denizaksimsek.com>{rel=me .u-email} | Twitter: [@DenizAksimsek][twitter]{rel=me} | GitHub: [dz4k][github]{rel=me} | DEV: [dz4k][devto]{rel=me}
{.me-elsewhere}

I am **Deniz**, a person. I'm into web development, programming languages and design. I'm currently studying Computer Engineering at [TEDU] in Ankara, Turkey.
{.p-note}

</div>


<section class=h-feed>

## Blog {.p-name}

{%set year = 0%}
{%for entry in collections.posts|reverse%}
{%if entry.date.getYear() !== year%}
{%set year = entry.date.getYear()%}
### {{entry.date | datefmt('yyyy')}}
{%endif-%}
- <time datetime="{{entry.date|isodatetime}}">{{entry.date|datefmt('MMM dd')}}</time> [{{entry.data.title}}]({{entry.url|url}})
{%-endfor%}

</section>

<div class="put-in-box">

## Ankara Railway Map

I made a thing. It's a map of urban railways in Ankara. It lives on <https://ankarametro.dz4k.com> and it's way better than the official one.

</div>


[cats]: //cats.denizaksimsek.com
[TEDU]: //www.tedu.edu.tr/
[Twitter]: //twitter.com/DenizAksimsek/
[devto]: https://dev.to/dz4k
[email me]: mailto:deniz@denizaksimsek.com
[GitHub]: //github.com/dz4k/
