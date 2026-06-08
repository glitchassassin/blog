---
title: 'Obsidian Markdown Fixture'
date: June 8, 2026
excerpt: Draft fixture for Obsidian-style Markdown rendering tests.
category: tests
tags: []
draft: true
---

This wikilink resolves to [[My Obsidian Setup|the Obsidian setup note]].

This heading wikilink resolves to [[My Obsidian Setup#Daily Notes|Daily Notes]].

This wikilink uses its note title as the label: [[My Obsidian Setup]].

This unresolved wikilink stays readable: [[Missing Knowledge Base Note]].

Inline note embeds render as cards in prose: ![[My Obsidian Setup|inline embed alias]]

> [!tip] Obsidian Callout
> Callouts render as styled blockquotes.

## Callout Types

> [!note] Note
> General note content.

> [!abstract] Abstract
> Also used for summary and tldr callouts.

> [!info] Info
> Informational callout content.

> [!todo] Todo
> Action-oriented callout content.

> [!tip] Tip
> Helpful guidance callout content.

> [!success] Success
> Also used for check and done callouts.

> [!question] Question
> Also used for help and faq callouts.

> [!warning] Warning
> Also used for caution and attention callouts.

> [!failure] Failure
> Also used for fail and missing callouts.

> [!danger] Danger
> Also used for error callouts.

> [!bug] Bug
> Bug callout content.

> [!example] Example
> Example callout content.

> [!quote] Quote
> Also used for cite callouts.

> [!summary] Summary alias
> Alias for abstract.

> [!done] Done alias
> Alias for success.

> [!help] Help alias
> Alias for question.

> [!attention] Attention alias
> Alias for warning.

> [!missing] Missing alias
> Alias for failure.

> [!cite] Cite alias
> Alias for quote.

> [!info]+ Fold-open marker
> Obsidian supports optional callout fold markers.

> [!warning]- Fold-closed marker
> Public rendering keeps the content visible.

## Embeds

![[obsidian-with-cursor.png|Obsidian screenshot]]

![[assets/images/obsidian-with-cursor.png|Image with assets prefix]]

![[Pasted image 20250402081738.png|Image filename with spaces]]

![[My Obsidian Setup]]

![[My Obsidian Setup#Daily Notes|Daily Notes embed]]

![[Missing Embedded Note]]

## Mixed Markdown

> [!example] Markdown inside a callout
> - List item inside a callout
> - Link inside a callout: [[My Obsidian Setup]]
>
> `inline code` and **bold text** inside a callout.

Block refs are hidden at the end of a sentence. ^inline-fixture-block

This line includes #knowledge/management for search indexing.

^fixture-block
