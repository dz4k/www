---
title: "Eleventy — Using A Layout As A Partial (The Most Useful Things...)"
tags: [
  'programming'
  'eleventy'
]
date: '2020-06-08T14:50+0300'
---

On this website, I have both a <a href="/notes/">Notes</a> page and pages for each individual note. I wanted to use the same template for both, but I ran into an issue: accessing frontmatter data.

<!-- endexcerpt -->

In Eleventy, frontmatter data for the current page is merged into the [data cascade](https://www.11ty.dev/docs/data-cascade/) and made available on the template global scope, whereas collection items have a `data` property. This made it hard to write templates that work with both the `page` object and collection items.

Solution
--------

> \[...] the most useful things are usually cloaked in an air of nonchalance, even in documentation.
>
> <footer>
>
> <cite>YouTube user [Bantu Tu][bantu-tu], commenting on [Missing Semester: Lecture 3: Editors (vim) (2020)][missing-semester]</cite>
>
></footer>

[bantu-tu]: https://www.youtube.com/channel/UCjknfwYaYZvv94AjL10NO0Q
[missing-semester]: https://www.youtube.com/watch?v=a6Q8Na575qc

The solution to my problem was right there in the Eleventy docs, staring at me, its description phrased such that it couldn't possibly be of use to anyone.


> ### Also `getCollectionItem`
>
> For completeness, a `getCollectionItem` filter is also included that fetches the current page from a collection.
>
> <footer>
>
> <cite>[Eleventy docs](also-getcollectionitem)</cite>
>
> </footer>

[also-getcollectionitem]: https://www.11ty.dev/docs/filters/collection-items/\#also-getcollectionitem

With this filter, all my problems were solved. I prepended the following to my `note.njk` template (similarly for `post.njk`):

{%raw%}
```liquid
{%set item = note | d(collections.note | getCollectionItem(page))%}
```
{%endraw%}

When using `note.njk` as a partial, the caller assigns the variable `note`. When using it as a layout, no such variable will exist and the default (`d()`) will be used.. The beauty of this configuration is that in both situations, `item` will be a collection item with a `data` property.

One caveat is that because I'm using this as a partial, I can't use frontmatter, and therefore can't set a layout for my layout (maybe I could use template data files...). Instead, I use Nunjucks' builtin [template inheritance](https://mozilla.github.io/nunjucks/templating.html#template-inheritance).

{%raw%}
```liquid
{%if not note%}
{%extends "base.njk"%}
{%endif%}
...
{%block content%}
{%set item = note | d(collections.note | getCollectionItem(page))%}
...
{%endblock%}
```
{%endraw%}
