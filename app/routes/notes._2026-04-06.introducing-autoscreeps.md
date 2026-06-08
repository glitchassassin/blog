---
title: 'Screeps #28: Introducing Autoscreeps'
date: April 6, 2026
excerpt: Since the big shift in November 2025, when agents started to become really good, I've been wondering how far they could get on a Screeps codebase on their own.
category: screeps
tags:
  - screeps
  - agents
draft: false
---

The article below describes `autoscreeps` in its current state at publication. [Here's the GitHub repo](https://github.com/glitchassassin/autoscreeps) if you'd like to follow along.

The last time that I played Screeps seriously, tab-complete was still my primary mode of agentic engineering and the best models were OpenAI's o1 and Claude 3.5. Cursor's agent chat interface was just starting to become really useful.

Since the big shift in November 2025, when agents started to become really good, I've been wondering how far they could get on a Screeps codebase on their own.

Today, I am... not answering that question.

## Autoresearch

Andrej Karpathy posted about [his autoresearch project](https://x.com/karpathy/status/2030371219518931079) for iteratively improving model training. The idea is that the agent can design and conduct experiments, gradually collecting its findings and keeping the winning ideas, improving over time as it identifies what works and what doesn't.

For this to work, the agent needs to have good feedback. It needs to be able to tell how the experiment went - not just whether it succeeded or failed, but _why_ it succeeded or failed.

If we're going to apply this to Screeps, we need to be able to give the agent access to a lot of data automatically.

## Setting up the lab

Obviously, there's no way we'll be iterating quickly on a public server, so the first step is setting up a private server stack locally. Coding agents can run docker commands directly, but that will be inefficient and error-prone; instead, we want a CLI interface the agent can use to spin up (or reset) a stack, spawn in one or more bots for a head-to-head test, and dump logs/telemetry for later analysis.

This CLI tool meets my criteria for vibe coding: it's a personal tool, no one else will be using it, and it will be readily apparent whether the output is correct or not. So, I'm paying no attention to what the agent writes and only focusing on whether it works.

This is in [`tools/autoscreeps-cli`](https://github.com/glitchassassin/autoscreeps/tree/main/tools/autoscreeps-cli):

```sh
node src/cli.ts experiment run duel \
  --scenario ../../experiments/scenarios/duel-basic.yaml \
  --baseline-source git:main \
  --baseline-package bots/basic \
  --candidate-source workspace \
  --candidate-package bots/basic
```

A collection of data about the run is dumped to JSON files, which are also monitored by `autoscreeps experiment watch` for a nice TUI dashboard to visualize long-running experiments.

![Autoscreeps experiment dashboard](/assets/images/Pasted%20image%2020260406123857.png)

## Doing the science

Setting up the lab is frighteningly easy (compared to some of the hoops I jumped through in the past, to get something similar running with far fewer features). Getting the LLM to do the research... that's tough.

I'm doing most of my work with OpenAI's GPT5.4 model these days. And, while it is pretty good at instructions, it also tends to be lazy. If it sees something major that needs to be changed, it will prefer to look for a shortcut instead.

This is on purpose - it discourages the model from eagerly refactoring the whole codebase with every little change - but it also means the model tends not to be very thorough or rigorous in its analysis, by default.

Thus, while the agent is experimenting on the code, I am experimenting on the agent! I already know a lot of the basic principles for a good starter bot (or at least, I think I do), but I want the agent to be able to discover those principles without _too_ much direct prompting from me. So, I have to teach it how to run the experiments: to add telemetry to the bot (written to a [Memory segment](https://docs.screeps.com/api/#RawMemory.segments), so the harness can access it); to consult the Screeps source code to figure out details of how the game works; and so on.

## AGI is not here yet

One of its most obvious flaws is that it tends to take the existing code as deliberate constraints. For example, it began with a fixed spawn queue of two harvesters and two workers; while pondering possible reasons for slow upgrade speeds, it never even considered that it could spawn more harvesters and workers to increase throughput. Can it be taught to take the world of Screeps as its ground truth, rather than its experimental codebase? We will see.

I strongly suspect that it would be faster to set up the experiment runner and then give it explicit directions rather than letting it explore the problem space - having just the experiment runner would be a major improvement over the last time I was manually developing my Screeps codebase.

But I want to push this and see how far autoresearch can go.

Today, the agent is experimenting with dedicated roles for harvesters, couriers, and workers.

Tomorrow - who knows?
