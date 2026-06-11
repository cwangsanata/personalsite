---
title: Roku Alarm Clock
description: Because I wanted to wake up to my TV and couldn't find anything that did it right, so I built it myself.
publishDate: 2024-09-08
isFeatured: true
---

I have a Roku TV. I wanted an alarm clock that would turn it on and play something at a specific time. Nothing on the Roku channel store did exactly what I wanted, so I did what any reasonable person does: spent significantly more time building it from scratch than it would've taken to just wake up manually.

The result is a self-hosted Python server that talks to Roku devices over the local network via their [External Control API](https://developer.roku.com/docs/developer-program/debugging/external-control-api.md). Set alarms through a REST API, have it wake up your TV, launch an app, the whole thing. Docker-ized so it runs happily on a Raspberry Pi and survives reboots.

Is it overengineered? Yes. Does it work? Also yes.

**[View on GitHub →](https://github.com/cwangsanata/Roku-Alarm-Clock)**

**Stack:** Python, Docker, REST APIs, existential commitment to homelab projects
