---
title: Road To The IndieWeb
date: 20200826T1523+0300
tags: [website,indieweb]
---

or, Why I uninstalled Twitter from my phone.
<!-- endexcerpt -->

***

> The IndieWeb is a people-focused alternative to the "corporate web". 
> <footer>&mdash; <cite><a href=//indieweb.org/>indieweb.org</a></cite></footer>

On the IndieWeb, you post stuff on your own website instead of places like Twitter or Instagram. The people of IndieWeb develop standards and tools for
- Syndication --- so that you can still benefit from the aforementioned social networks and the reach they provide
- Webmentions --- interaction between websites in the form of likes, replies, reposts and more
- Publishing --- so you can post to your website from a variety of apps

I implore all readers to explore indieweb.org as there is so much more great work that I couldn't possibly cover here.

Square One
----------

The [earlier versions of my website](old-site) were a real stretch of the word "blog". Just a dump of Markdown files, with not even timestamps. As I used it however, I realized I wanted a website with the following: 
- **Short-form posting.** Most of what's currently on my website is just random phrases that were stuck in my head.
- **Comments.** I was sick of gently whispering into the void, but I also really didn't want to use Disqus.


Webmentions & Syndication: Webmention.io and Brid.gy
----------------------------------------------------

Webmention.io receives webmentions on your behalf and makes them available to you via an API. Bridgy takes likes, replies etc. from Twitter and others and sends them to you as Webmentions.

To display Webmentions on my site, I used Eleventy's JavaScript Data Files feature to fetch them.

Posting on the go: [Mastr-Cntrl](mastr-cntrl)
---------------------------------------------

I had to modify the code quite a bit to adapt it to my website, but Mastr-Cntrl works well on Heroku as a [Micropub](micropub) server. I use [Indigenous](indigenous) on my phone and [Micropublish](micropublish) on my laptop to post. Much better than using the GitHub editor and manually adding dates to everything.


Following others: [Aperture](aperture)
--------------------------------------

Aperture is a [Microsub](microsub) server, and with the aforementioned Indigenous, I can follow my favorite websites. [Granary](granary) converts social network data into any kind of feed like RSS or Atom, so I no longer have to use the Twitter app and get angry at the Trends section. I use the public Aperture instance now, but planning to self-host it (along with some other stuff).

Conclusion
----------

If all of this seems like a lot of work, don't worry --- I mean, it's actually a lot more than it seems with the amount of research and trial-and-error, but there are easier ways. [Micro.blog](microblog) will host an IndieWeb site for you for US$5 (ŧ37.02 at time of writing) plus domain name price.

I'm still not sure the work was worth $5, but I couldn't be happier with the results.

[--- @dorukrblt here it is!](https://twitter.com/dorukrblt/status/1298269073860472835?s=20){.u-in-reply-to}

[old-site]:      https://5ea353e31eb20b0006c72757--denizaksimsek.netlify.app/
[mastr-cntrl]:   https://github.com/vipickering/mastr-cntrl
[micropub]:      https://indieweb.org/Micropub
[indigenous]:    https://indieweb.org/Indigenous_for_Android
[micropublish]:  https://micropublish.net/
[aperture]:      https://aperture.p3k.io/
[microsub]:      https://indieweb.org/Microsub
[granary]:       https://granary.io/
[microblog]:     https://micro.blog/
