---
permalink: /deleted/
layout: page
eleventyExcludeFromCollections: true
templateEngineOverride: njk,md
---

Whatever was here is not here anymore.

<ul role=list class="links">
	<li><a href="/"><strong>Deniz Akşimşek</strong></a>
    {% for entry in (collections.longform | reverse).slice(0, 3) -%}
        <li><a href="{{ entry.url }}">{{ entry.data.title }}
            <time>{{ entry.date | isodate }}</time></a>
    {% endfor -%}
    <li><a href="/archive">all posts</a>
</ul></nav>

