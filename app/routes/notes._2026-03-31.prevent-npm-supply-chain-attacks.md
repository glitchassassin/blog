---
title: Prevent NPM Supply Chain Attacks
date: March 31, 2026
excerpt: Only install packages that have been released for at least 7 days.
category: security
tags: []
draft: false
---

There have been a _ton_ of supply chain attacks on npm packages lately, and the worst part is that because they target developers, they can spread laterally. Compromise a package, and you compromise the developers who install it; then, you can compromise their published packages too!

Fortunately, these compromised packages tend to be caught within a day or two. So, a simple line of defense is to only install packages that have been released for at least 7 days.

```toml
# .npmrc
min-release-age=7
```

Note that the [`min-release-age`](https://docs.npmjs.com/cli/v11/using-npm/config#min-release-age) flag only works on npm v11+, so you may need to upgrade. (If you use a different package manager, check its docs for an equivalent.)

You probably also want to enforce the right version of npm:

```toml
# .npmrc
engine-strict=true
min-release-age=7
```

```json
// package.json
{
 "engines": {
  "npm": ">=11"
 }
}
```

The `engine-strict` flag will fail, rather than continuing with a warning, if you are using an older version of npm that doesn't support the `min-release-age` flag.
