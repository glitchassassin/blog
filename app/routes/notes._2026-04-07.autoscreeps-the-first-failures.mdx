---
title: 'Screeps #29: Autoscreeps - The First Failures'
date: April 7, 2026
excerpt: So far, it seems, the complexity of Screeps system design & optimization is beyond the reach of today's undirected agents. But this does not make them useless!
category: screeps
tags:
  - screeps
  - agents
draft: false
---

So far, Autoscreeps has been struggling.

## Fully Automatic Failure

After a couple of rounds of iteration, I settled on an approach where the agent runs in a loop of:

1. implementing an experiment
2. running it
3. evaluating the results
4. comparing notes with a `screeps-world-expert` subagent to determine what may have gone wrong
5. designing the next experiment

Its first task was just to speed up the process of getting to RCL3. So it designed a series of experiments: with and without building extensions, with different types of workers or dedicated harvesters/upgraders, and it implemented and ran the tests. Each time it tried changing one or two small things and comparing the results to the previous run.

However, many of its experiments have flawed code. For example, some of the workers were not locking their targets correctly and so they would end up thrashing: switching back and forth between sources that have energy available, and never making it all the way to the source to pick up the energy. Or it would fixate on its existing spawn queue and ignore the possibility that it might need to spawn more creeps dynamically to increase energy throughput.

I [defined a sub-agent](https://github.com/glitchassassin/autoscreeps/blob/3f97956410c605bbe4c365c5312d305200994d39/.opencode/agents/screeps-world-expert.md) that has access to the Screeps documentation and source code, but not the experimental codebase, and can serve as a Screeps expert without having its assumptions contaminated by the current codebase. The main agent then consults the expert subagent about the problems it's seeing, and because the subagent has a different context, it can propose different ideas the main agent would not have come up with.

But the agent struggles with identifying what, exactly, went wrong with its approach - probably because there are so _many_ options to take, and the variable it's optimizing for (ticks to RCL3) is vague. It easily gets caught in local optimizations (building extensions takes time away from upgrading, therefore building extensions is bad!) and fails to recognize when an experiment is flawed due to a mistake in the code rather than a bad hypothesis.

So, if _fully_ automatic research is out of the question, how about semi-automatic research?

## Semi Automatic Success

I spent a while arguing with GPT 5.4 about theorycrafting for room building. I was hoping to find a more generative approach than my previous incarnation (which included fairly typical stamps for the hub, fastfiller, and labs). I found a few minor improvements, but the most significant advancement came from an improved prototyping rig.

I had my agent build a room planning visualizer to step through the layers of the room plan!

![Room planning visualizer](/assets/images/Pasted%20image%2020260430203843.png)

Now, this isn't _that_ new. I've had visualizations for room planning in game [for a long time](https://jonwinsley.com/notes/screeps-room-planning). But iteration was slow: I had to spawn into a map, wait for rooms to be scouted and the planner to run. If I wanted to make changes, I had to push them up, manually clear the room plan and re-run it.

Now, I can just load a map fixture from [Screeps Private Server Maps](https://maps.screepspl.us/) and test the room planning logic step-by-step across any room I want.

Could I have done this before, without AI? Sure. But it would have been even more of a pain than the slow iteration in game. It wasn't worth it then.

Now that software is cheap, this kind of prototyping makes a lot more sense.

## A New Strategy

So far, it seems, the complexity of Screeps system design & optimization is beyond the reach of today's undirected agents. But this does not make them useless!

Agents are really good at prototyping; iterating on narrow, objectively testable goals (like debugging, or improving performance in a specific area of your code); and doing tedious things like creating long-running test scenarios on the fly or refactoring chunks of code.

Rather than starting over completely from scratch, I've brushed off my "advanced" codebase, which I forked from [my original open-source codebase](https://github.com/glitchassassin/screeps/) when I started implementing combat missions. With the agent's help, I've updated it to Node 24 for the new Screeps update, switched the build to Vite, and set it up with the `autoscreeps` telemetry the agent needs to test and debug issues with real runs on a local high-speed private server.

Now, I can tell the agent something like:

> let's take a look at LogisticsMission.ts and see what we can do to improve CPU usage. identify some target areas for profiling with autoscreeps telemetry

and have the agent set up telemetry; run a test for several thousand ticks; analyze the results; add [screeps-clockwork](https://github.com/glitchassassin/screeps-clockwork) flow fields to travel to sources; and re-profile to determine if that helped (it did!). Finally, I can tell the agent to run a duel vs. the previously committed version, and it will use autoscreeps to spawn both versions into identical halves of a private server map and run them against each other to make sure there are no major regressions.

Screeps is a great place to get familiar with what agents are good at, what they aren't, and practice using them effectively.
