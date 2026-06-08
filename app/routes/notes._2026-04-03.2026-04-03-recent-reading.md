---
title: Recent Reading
date: April 3, 2026
excerpt: A collection of interesting posts and articles I've run across recently.
category: links
tags: []
draft: false
---

## Leveling Up

> When Anthropic's team ships a product like Cowork in 10 days and another team can't move past a broken POC using the same models, the difference is that one team has closed the gap between capability and practice and the other hasn't.  
> That gap doesn't close overnight. It closes in levels. 8 of them.  
> [The 8 Levels of Agentic Engineering — Bassim Eledath](https://www.bassimeledath.com/blog/levels-of-agentic-engineering)

I'm going to be giving a talk about this very subject at work soon.

## Harness Engineering

> Gas Town is complicated. Not because I wanted it to be, but because I had to keep adding components until it was a self-sustaining machine. And the parts that it now has, well, they look a lot like Kubernetes mated with Temporal and they had a very ugly baby together.  
> [Welcome to Gas Town](https://steve-yegge.medium.com/welcome-to-gas-town-4f25ee16dd04)

> Over the past several months I’ve been working on two interconnected problems: getting Claude to produce high-quality frontend designs, and getting it to build complete applications without human intervention... The final result was a three-agent architecture—planner, generator, and evaluator—that produced rich full-stack applications over multi-hour autonomous coding sessions.  
> [Harness design for long-running application development](https://www.anthropic.com/engineering/harness-design-long-running-apps)

Two different takes on the same problem. What's interesting about the Anthropic article is it shows how the harness itself needs to evolve based on the model's capabilities. This raises questions about how valuable it really is to sink a lot of time into engineering a harness for a specific model if a lot of that is going to change as soon as the next model releases.

## Slow Mode

> Everyone is trying to go faster, running more agents to run more agents, to open more pull requests to orchestrator agents to then get reviewed by another fleet of agents. The arrival of coding agents has turned software development into something that looks like a factory (or casino) floor — and the temptation is to optimize for throughput, to feel the dopamine hit of watching five Codex tasks resolve while you start three more... I went the other direction, I slowed down.  
> [Slowing Down in the Age of Coding Agents](https://gogogolems.substack.com/p/slowing-down-in-the-age-of-coding?r=6k94e&utm_campaign=post&utm_medium=web&triedRedirect=true)

I've also been slowing down, spending more time thinking about and reading the code than shipping it. I'm working on an OpenCode frontend for my Boox e-ink tablet to make this nicer. (I'll post about this soon!) So this article resonated.

As an aside, I set up Wispr Flow on my Boox tablet for dictation. I've used it previously on Mac and iOS. It is really clunky on iOS (have to switch to a custom keyboard!) but on Android it's pretty seamless and smooth.

The only issue that I ran into is that Boox wants to aggressively close Wispr Flow while it's in the background - probably for energy savings, I guess? You can disable App Freeze for Wispr Flow to prevent this from happening.

## Thoughtworks

Lots of sound wisdom from Thoughtworks recently:

> AI coding assistants default to generating implementation immediately — embedding design decisions invisibly in the output. I propose a structured conversation pattern that mirrors whiteboarding with a human pair: progressive levels of design alignment before any code, reducing cognitive load and catching misunderstandings at the cheapest possible moment.  
> [Design-First Collaboration](https://martinfowler.com/articles/reduce-friction-ai/design-first-collaboration.html)

> AI conversations are ephemeral by design — decisions made early fade as sessions lengthen, and nothing survives the session boundary. Developers hold on to long conversations not because long sessions are productive, but because the context lives nowhere else. I propose externalizing decision context into a living document — external memory that persists what the context window cannot, turning transient alignment into durable shared understanding.  
> [Context Anchoring](https://martinfowler.com/articles/reduce-friction-ai/context-anchoring.html)

> AI coding assistants respond to whoever is prompting, and the quality of what they produce depends on how well the prompter articulates team standards. I propose treating the instructions that govern AI interactions (generation, refactoring, security, review) as infrastructure: versioned, reviewed, and shared artifacts that encode tacit team knowledge into executable instructions, making quality consistent regardless of who is at the keyboard.  
> [Encoding Team Standards](https://martinfowler.com/articles/reduce-friction-ai/encoding-team-standards.html)

> To let coding agents work with less supervision, we need ways to increase our confidence in their result. As software engineers, we have a natural trust barrier with AI-generated code - LLMs are non-deterministic, they don't know our context, and they don't really understand the code, they think in tokens. This article explores a mental model that brings together emerging concepts from context and harness engineering to build that trust.  
> [Harness engineering for coding agent users](https://martinfowler.com/articles/harness-engineering.html)
