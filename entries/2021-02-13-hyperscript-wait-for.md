---
title: "Upcoming _hyperscript feature: Waiting for an event"
date: 2021-02-13T17:45:11.5407427+03:00
repostOf: https://twitter.com/htmx_org/status/1360593828894281736
---

> hyperscript 0.0.4 beta is going to be out soon
> 
> a sneak peek:
> 
> the wait command can now pause evaluation until an event is received
>
> here a class is added, hyperscript waits for the transition to end, then the 
> element is removed
>
> feature suggested by @DenizAksimsek
>
> ```html
> <div _="on click add .fade then wait for transitionend then remove">
>   This is a notice. Click to dismiss.
> </div>
> ```
