---
title: "Tip: Instantly Edit Your Eleventy Site on Github"
tags: ['eleventy', 'website', 'tips', 'js']
---

You're looking at the blog post you made yesterday, when suddenly a typo catches your eye. What is the fastest way to fix it? ([Skip to code]({{page.url}}/#the-code)).

<!-- endexcerpt -->

**Note:** This tip assumes you use GitHub. It could likely be adapted easily for other Git providers.

Add the following to your base layout (note the `{%raw%}{{}}{%endraw%}` and replace `<username>/<repo>` with the repo for the site):

```html
<script>
  addEventListener('keyup', e => {
    if (e.shiftKey === true) {
      switch (e.keyCode) {
      case 69: // E
        window.location = 'https://github.com/<username>/<repo>/edit/master/{%raw%}{{page.inputPath}}{%endraw%}'
        break
      }
    }
  })
</script>
```

When you press <kbd>Shift+E</kbd>, the GitHub editor will open to the current page! The switch statement is there because I used to have a few more hotkeys.
