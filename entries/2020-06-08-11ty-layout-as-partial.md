---
title: Eleventy — Using A Layout As A Partial (The Most Useful Things...)
date: 2020-06-08T14:50+03
syndication:
  DEV: https://dev.to/dz4k/eleventy-using-a-layout-as-a-partial-the-most-useful-things-182n
---

<ins>

**Update 2021-02-08:** This article mentions things about my website that are no longer true. The technique explained, however, still works fine.

</ins>

On this website, I have both a Notes page and pages for each individual note. I wanted to use the same template for both, but I ran into an issue: accessing frontmatter data.

In Eleventy, frontmatter data for the current page is merged into the [data cascade][] and made available on the template global scope, whereas collection items have a `data` property. This made it hard to write templates that work with both the `page` object and collection items.

## Solution

> [...] the most useful things are usually cloaked in an air of nonchalance, even in documentation.
>
> <footer>
>
> <cite>YouTube user [Bantu Tu][], commenting on [Missing Semester: Lecture 3: Editors (vim) (2020)][missing-semester]</cite>
>
></footer>

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

With this filter, all my problems were solved. I prepended the following to my `note.njk` template (similarly for `post.njk`):

{%raw%}
```liquid
{%set item = note | d(collections.note | getCollectionItem(page))%}
```
{%endraw%}

When using `note.njk` as a partial, the caller assigns the variable `note`. When using it as a layout, no such variable will exist and the default (`d()`) will be used.. The beauty of this configuration is that in both situations, `item` will be a collection item with a `data` property.

One caveat is that because I'm using this as a partial, I can't use frontmatter, and therefore can't set a layout for my layout (maybe I could use template data files...). Instead, I use Nunjucks' builtin [template inheritance][].

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

[data cascade]: https://www.11ty.dev/docs/data-cascade/
[Bantu Tu]: https://www.youtube.com/channel/UCjknfwYaYZvv94AjL10NO0Q
[missing-semester]: https://www.youtube.com/watch?v=a6Q8Na575qc
[also-getcollectionitem]: https://www.11ty.dev/docs/filters/collection-items/\#also-getcollectionitem
[template inheritance]: https://mozilla.github.io/nunjucks/templating.html#template-inheritance
