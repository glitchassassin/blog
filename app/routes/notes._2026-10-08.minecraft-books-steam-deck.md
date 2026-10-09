---
title: Fixing Minecraft Books on Steam Deck
date: October 8, 2026
excerpt: We've been putting up with some minor irritations with keyboards for a while. The onscreen keyboard only sometimes worked, and the Steam Deck keyboard sometimes worked, and nothing worked for writing in books!
category: gaming
tags: []
draft: false
---

My kids and I share a Steam Deck, and one of our favorite games is Minecraft. You can install a launcher and get the Java Edition running without too much trouble. Install Fabric (to load mods) and the Controlify mod (to adapt the Steam Deck controls) and you're pretty much good to go.

But we've been putting up with some minor irritations with keyboards for a while. The onscreen keyboard only sometimes worked, and the Steam Deck keyboard sometimes worked, and nothing worked for writing in books!

Finally we got exasperated and I set to troubleshooting with a little help from ChatGPT. I disabled the onscreen keyboard in Minecraft's Controller Settings -> Settings, and tested the Steam Keyboard (with Steam + X) in several places. It mostly worked... but still not for books.

To rule things out, I disabled Controlify and switched Steam's controller to Keyboard (WASD) and Mouse mode. This mode was terrible for playing the game, but it was good enough to get the book open and confirm that, sure enough, without Controlify I could write in the book just fine.

I re-enabled Controlify and had ChatGPT dig deeper. It poked through Controlify's code and figured out that disabling Mixed Input mode (in Minecraft's Controller Settings -> Global Settings -> Miscellaneous) might fix the issue. It also recommended restarting Minecraft as it found a bug report that toggling Mixed Input didn't take effect until after a restart.

I disabled Mixed Input and restarted Minecraft. This time I was able to write in books with the normal Steam keyboard!

Thanks, ChatGPT. My kids can now begin their literary careers.
