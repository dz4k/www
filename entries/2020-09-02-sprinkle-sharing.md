---
title: Sprinkle Sharing
date: 2021-09-02T19:41+03
---

<aside>

This post is straight from my notes. 

</aside>

When people talk about code sharing between server and client, the usual suspects are Node.js and sharing model classes. However, there's often good reason to duplicate these. 

A far more interesting type of code sharing to me is eliminating this duplication:

When you are writing a server-driven web app with "sprinkles" of JS, you want to have interactive components, but also deliver usable HTML to non-JS-enabled [^1] clients. This means you are essentially writing a component with the first render and subsequent updates are written in different languages -- HTML then JS. How to make this nicer? (Existing answers follow)

## Alpine and similar

Write both in one language: "HTML with JS inline in special attributes".

## React and similar

Write both in one language: "JS optionally with JSX". Hard to set up sprinkle style, but wasn't this how it was originally created to be used?

[^1]: "Non-JS-enabled" includes not only browsers where the user turned off JS, but also times when the JS didn't load, or errored due to use of unsupported modern features.

