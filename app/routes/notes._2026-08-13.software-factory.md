---
title: Building a Software Factory
date: August 18, 2026
excerpt: One of my priorities for the first iteration of my software factory was to not write my own factory harness. Codex (now ChatGPT Desktop) has gradually been adding features and, with the recent release of the Linux version, now theoretically has everything I need!
category: ai
tags: []
featureImage: /assets/images/illuminated-steam-engine-journal.png
featureImageDark: /assets/images/illuminated-steam-engine-journal-dark.png
featureImageAlt: An Art Nouveau field-journal illustration of a beam steam engine framed by botanical ornament.
draft: false
---
As I've been working on [EverySheep](https://covenantfoundry.com/projects/everysheep/) I've gradually been improving the agentic engineering framework around it - refining the skills and automated tests that are responsible for producing and verifying quality code.

Agents have been getting remarkably good. With a good suite of tests, linters, type-checking, etc. I'm now much less concerned about whether the code is "good." Now, what I care about is whether the agent understands the system, the problem space, and the requirements of the current task.

Let's run through the first version of the Codex software factory setup I'm piloting for EverySheep.

I want the software factory to:

1. Pull work automatically from a bucket of refined and specced tasks
2. Allow (remote!) manual review of code and a preview environment
3. Automatically approve low-risk or well-defined changes
4. Merge intelligently when the changes are approved

## Building the Factory

One of my priorities for the first iteration of my software factory was to *not* write my own factory harness. Codex (now ChatGPT Desktop) has gradually been adding features and, with the recent release of the Linux version, now theoretically has everything I need! I'll be using a combination of ChatGPT Desktop and a few custom skills.

### An Isolated Environment

I tested the initial pattern on my main dev machine, but for long-term purposes I want to give the factory its own isolated environment. I set up an Ubuntu VM (hosted on local hardware for now) with ChatGPT Desktop, Tailscale (to serve preview environments), and a GitHub deploy key with read/write access to just the EverySheep repository.

This environment isolation isn't perfect; I've made some deliberate tradeoffs. The factory can still push changes out to the repository, which are built and (assuming the ci pipeline passes) deployed automatically. In an ideal scenario, I'd allow only the integration agent to push commits to the main branch, locking down the implementation agents so they have to work with a feature branch. For now, on the GitHub free plan, I don't have a great way to define this separation of duties, so I'm accepting this risk.

(That's one of the drawbacks of not writing your own factory harness.)

I did consider Codex cloud agents. However, these have a number of drawbacks compared to ChatGPT Desktop. They are too opinionated in how they are allowed to use git - they can't even create a PR on their own without a lot of wrangling! And preview environments, discussed below, would require additional infrastructure. Someday the Codex cloud agents might be seamless enough to work well here, but they're not quite ready yet.
### A Factory Manager

The Codex features that unlocked my factory workflow are scheduled tasks/heartbeats; cross-session communication; worktrees; and Linear integration.

First, Linear is the authoritative tracker for work in progress. Tasks that I haven't prioritized yet stay in the Backlog. Tasks I've decided to work on go to Needs Refinement until I can fill out a spec that details everything the agent needs to know for implementation. Once the task is ready to work, it moves to Todo and is ready to pick up. When the task is assigned to an agent, it's moved to In Progress and a comment is added documenting the assigned agent. When the agent is done, it moves either to Ready to Review (if the release gate determines that human review is necessary) or Ready to Merge (if human approved or the release gate determines human review is unnecessary). Once merged, the issue is moved to Done.

Two dedicated sessions are responsible for managing this flow: a Supervisor and an Integrator. (Originally, I had these triggered by a heartbeat; however, I ran into some stability issues, discussed below, and for now am just kicking these off manually.)

The Supervisor session polls the active Linear tasks. It makes sure that In Progress tasks have a running session (and nudges the session, if needed, to keep going). It will fire up a new Task Agent session and assign a Todo task, up to a quota (currently two active task agents at a time - might change this eventually).

The Integrator session also polls the active Linear tasks, looking for tasks that are Ready to Merge. It attempts to merge the branch, and if there's a conflict or test failure it will kick the issue back to the Task Agent to resolve the problem and submit it for re-review.

The Task Agents do the bulk of the work in their own individual worktrees: reading the Linear issue, dividing up the work between subagents (luna xhigh for basic implementation, sol xhigh for UI work, sol xhigh to review work), and then sending the task to Ready to Review or Ready to Merge.

### The Showroom

Once a Task Agent finishes its task, it spins up a local dev server and has Tailscale forward the port. This allows any device on my Tailnet to connect to the dev server. The agent adds the Tailscale URL to the Linear task and kicks it over to Ready for Review.

At this point, I can pull up the agent's session in the ChatGPT app to review the changes, ask questions, and click through the app - all through my phone! Once I'm satisfied, I'll approve the changes, and the agent will kick it over to Ready to Merge for the Integrator.

All three of these pieces - manual testing, interactive questioning, and skimming the code - are vital. You do lose some nice-to-haves: Codex's Browser has Annotations that make review a little nicer when you're working on something locally. But even remote, it's smart enough to make sense of screenshots and explanations and handle any review items I have.

## ...With Duct Tape and Baling Wire

The advantage to using off-the-shelf software for your factory is that you don't have to engineer it to do everything you want.

The disadvantage, of course, is that you can't always configure it to do everything you want.

Here are some of the rough edges I haven't handled yet:

### Squishy Logic

Agents are squishy. They will do what you ask, which is awesome, but they aren't deterministic. Some tasks are better suited to a deterministic solution.

Ideally, the Integrator should be deterministic. One option could be using a GitHub PR workflow, where each PR runs the full test suite, and the Integrator just manages those PRs. That's where I started, but the limited GitHub Actions minutes I have don't go very far with the speed I want to ship.

Similarly, the comments tracking task ownership on Linear don't have an enforced format. Agents are instructed in the pattern to use for the comments, and they do a good job of populating the relevant information, but there aren't deterministic guardrails enforcing it.

And, of course, if I'm not keeping up with refining new tasks and there's no work to do, we shouldn't need to keep waking up the manager sessions (manually or with a heartbeat). We ought to be able to determine that (ha!) deterministically.

### Sandboxing

Part of the idea behind setting this up in a VM is limiting the blast radius. However, under the current architecture, the Task Agents can (though they shouldn't) push to main, which triggers deployments to production, if builds pass. In theory, one might decide this is the best way to reproduce an issue in production, by pushing debugging code up there directly! It'd be best to prevent that.

Ideally, only the Integrator should be able to push changes to main, once the task is done and tests pass. The Task Agents should only be able to work in their own branches. Supervisor agents shouldn't be able to make changes at all - only spin up and give directions to Task Agents.

### Stability

Over time, the heartbeat messages that trigger the supervisor/integrator processes began to experience some weird failures. The agent complained that "the Codex host is unavailable," saying that it was failing to rename the Task Agent sessions. Retries would keep failing, but a fresh session worked fine!

I'm not sure if this was a context corruption issue or if there genuinely was some issue with the Codex host, but I've fallen back to manually bumping the supervisor/integrator sessions as needed.

## To Be Continued

This is an experiment. Most software factories today are, really. We're still figuring out [which pieces are important and which aren't](https://yegge.ai/essays/the-shape-of-things-to-come/). I'm striking a balance between missing out today vs. over-investing in an architecture that's going to change tomorrow.

There are a few things I expect to happen in this space:

1. Useful primitives. I see a lot of investment in corporate-scale software factories ([Stripe's Minions](https://stripe.dev/blog/minions-stripes-one-shot-end-to-end-coding-agents), [Spotify's Honk and Xirp](https://xirp.spotify.com/)) but I expect to see composable pieces solidify which lets you build software factories at local or cloud scale (kind of like Docker containers did).
2. Composition. ChatGPT Desktop is becoming a great default work surface (especially with the recent voice chat improvements). I think we'll see more ways to compose harnesses, sandboxes, task management, work surfaces, etc. as the ecosystem develops.
3. Continuous integration. As the nature of "review" continues to shift, so will practices around integration. Here, "review" is already shifting away from reading the code on a pull request to an interactive, exploratory process. I expect this to continue to improve towards the true target: confirming a shared understanding.

In the mean time, I plan to explore some lightweight automation around the Codex App Server to see if I can encode the deterministic parts of this workflow without introducing *too* much complexity.

I'll keep you posted!
