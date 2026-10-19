---
title: "Agentic Development Today"
date: October 19, 2026
excerpt: "This writeup is a checkpoint of the way I use AI today."
category: productivity
tags:
  - agents
featureImage: /assets/images/field-journal-mechanical-assistant.png
featureImageDark: /assets/images/field-journal-mechanical-assistant-dark.png
featureImageAlt:
  An Art Nouveau mechanical assistant reads a book, lifts a pie from an oven,
  and repairs machinery with six articulated hands.
draft: false
---

I've been experimenting with agentic development since I signed up for OpenAI in
December of 2022. I signed up for Claude in March of 2024 and Cursor that
August. Over that time, my workflows have evolved from copy-pasting answers from
ChatGPT to tab-complete with Cursor to full-fledged agents.

This writeup is a checkpoint of the way I use AI today.

## Tools

- ChatGPT Pro ($200 sub) for personal life, work, and side projects
  - Desktop app on Mac (I'll sometimes refer to this as Codex)
  - Mobile app on iPhone and my Boox Android tablet
- Obsidian for organization
- VSCode (occasionally) for codebase exploration

## Personal Life

### Obsidian

I use Obsidian to organize my to-dos, home maintenance schedules & manuals,
recipes, shopping lists, and more. I use Obsidian Sync to sync it across my
laptop and mobile devices. Since it's just a repo of Markdown (and other) files,
my Obsidian vault is easily accessible to coding agents like ChatGPT Desktop.

There's one tradeoff: Obsidian Sync doesn't have an HTTP MCP server for ChatGPT
to access files directly, so my computer has to be running Desktop locally, with
access to the vault. If I want to interact with ChatGPT + Obsidian, I have to
either do it from my laptop or leave my laptop running so I can use a remote
Codex session via the ChatGPT mobile app. That works, but it always takes a
while to connect, so kicking off a new session isn't quick.

### Apple Calendar

I also gave ChatGPT Desktop access to my Apple Calendar by creating a skill
which runs local scripts on my laptop to read or update calendars. These
calendars are shared between me and my wife. There's not an official MCP
integration for this, yet, that I'm aware of.

### Dot

The Pro sub includes a Dot, OpenAI's version of the OpenClaw/Muse/Grok Bot
always-on agent. I haven't found a ton of uses I trust it for. I'd really like
to be able to restrict its permissions (and have individual agents with their
own limited scopes of responsibility). Maybe someday!

Since it has a cloud computer, I tested having it install the Obsidian Headless
Sync CLI, hoping that could give my Dot access to Obsidian. Unfortunately, the
environment eventually reset and wiped out the cli and the sync folder, so it
was not persistent enough.

### Research

I also use ChatGPT on its own.

For shopping decisions, I send it out to do some initial research. Then I decide
which product features are most important, and have it re-run its research to
find the best fit for my needs.

For recipes I do something similar: I have it search for many variants of a
particular kind of recipe and figure out what the common base is and where the
recipes diverge. Then I pick the variants I like best and have it record the
recipe. If I don't like something after trying the recipe, I discuss it with
ChatGPT to come up with some improvements.

I lean on it for troubleshooting basic household/vehicle issues, too. It can
pull manuals, forum discussions, etc from across the Internet to help narrow
down symptoms and suggest things to test.

## Software Development

I have a few different types of work: one primary project that gets the bulk of
my dev time; sales calls and assessments, where I'm asking questions and
gathering data that will be turned into a formal report; research and
experimentation with new technologies; and sometimes smaller side projects.

### Dev Workflows

In ChatGPT Desktop, I create a new Project for each repo I'm working in
(occasionally, I'll group related repos into one project, but normally I prefer
to keep everything for a project in one repo).

#### Agent Instructions

The repo itself stores skills and AGENTS.md instructions that are shared with
the team. If I have personal skills I like to use but aren't relevant to the
rest of the team, I'll add those to the skills folder with a local gitignore in
`.git/info/exclude`.

One example is my `demo-prep` skill which helps me prep for sprint demos. I'll
share the short version here - the actual version includes more details about
how to use the Azure DevOps MCP server correctly for our environment, and my
preferred output format:

```md
---
name: demo-prep
description:
  Prepares a sprint demo plan for the project. Fetches completed pull requests
  from the last two weeks, looks up their associated work items, and generates
  (1) a short bullet list of demo items for the sprint report and (2) high-level
  talking points for each item to use during the sprint review meeting. Use when
  the user runs /demo-prep or asks to prepare for a sprint demo or sprint
  review.
---
```

I try to keep these skills focused on just the specifics of my workflow:
repeating general advice or best practices the model's already aware of isn't
very effective.

#### Breaking Down Work

We plan each sprint ahead of time by committing to backlog items that outline
the features we're going to build. These are written from the users' point of
view, and typically don't specify technical details. So, after planning the
sprint, someone on the team (usually me) breaks these backlog items down into
tasks that can be worked independently.

I have a skill for that, too:

```md
## Workflow

1. Confirm the user wants child work items. If they ask how to implement an
   existing Task, provide a code-level plan outside this workflow. Only treat a
   Task as a parent when nested children are explicitly requested.
2. Identify the parent Azure DevOps work item from the user's prompt, linked
   context, or a work item lookup. If the parent item is ambiguous, ask for the
   missing ID or title.
3. Read the parent title, description, acceptance criteria, discussion, current
   children, and relevant links before drafting tasks.
4. Inspect the codebase as needed for implementation context, using read-only
   commands only. Do not make code changes, generate migrations, update
   snapshots, or stage files.
5. Draft the task breakdown in markdown and present it to the user for review.
6. Wait for explicit user approval before creating or updating Azure DevOps work
   items.
7. After approval, create the child tasks in Azure DevOps, format descriptions
   as HTML, add the required links, then report the created IDs and any
   unresolved assumptions.

## Task Drafting Rules

- Prefix every child task title with the owning implementation area, such as
  `backend:`, `frontend:`, `playwright:`, `deploy:`, `pipelines:`, or another
  clear repo area.
- Include unit or integration test work in each implementation task's scope.
- If the backlog item needs end-to-end coverage, create a separate `playwright:`
  task for that E2E work instead of folding it into backend or frontend tasks.
- Keep each task independently understandable: include the implementation goal,
  key files or modules when known, acceptance criteria, and expected test
  coverage.
- Model dependencies explicitly in the markdown draft and call out when a task
  cannot start until a predecessor lands.
- Prefer positive replacement behavior in test descriptions. Do not propose
  tests that only prove old or deleted code is absent.
```

in addition to the workflow, this skill also specifies some ADO configuration
details for the work items, and the Markdown format for presenting the draft
task breakdown to me.

I'll make sure I understand this first draft and the architecture assumptions
that it's making. Often I'll have questions or disagree with its approach, and
debate back and forth until I settle on a breakdown that I like.

Then, the agent creates the work items based on the approved final draft,
setting up links and dependencies between the tasks so we can see what sequence
they should be worked in.

On my side projects, I'll follow a similar process of refinement to turn feature
ideas into ready-to-work tasks with clear acceptance criteria and a test plan. I
want to make sure I understand the major choices the agent is making, and why.

#### Implementation

I have a scheduled task in Codex that reviews my open tasks (and unassigned
tasks) to identify things that need action from me: PRs with comments, tasks
that haven't been updated to reflect the current work progress, or unassigned
tasks that are ready to pick up. With the Azure DevOps MCP server, I can have
Codex handle some of those minor updates for me.

I can also tell it to spin up a new thread to pick up an unassigned task. It
will assign the task to me, move it to In Progress, and start a new separate
chat thread in its own worktree, separate from any other active agents working
on the same project.

Then I'll keep an eye on that chat thread, review the diff when it's done, and
test it in Codex's in-app browser. Codex has a built-in code viewer and editor,
but it's missing some of the niceties of modern editors like language servers,
so occasionally I'll resort to VSCode if I need to explore the codebase more
broadly. Once I'm satisfied with the implementation, I'll have the thread create
a draft PR.

We still practice human code review for all our projects. Our goal is
understanding: we want to make sure the team understands the code that is
created and the decisions that the agent made along the way.

So I have some more guidelines for creating PRs: the PR description ought to
state the problem we are trying to solve; what changes were made in the PR to
achieve that goal; and any significant implementation decisions. This should be
short, at most three paragraphs, and easy to read. The agent creates the draft,
and then I'll review it and adjust it as needed. For frontend changes, I'll
attach screenshots to make the human review process a little easier. (No one
wants to make it easy to automatically attach screenshots, for some reason, so
this goes through the web interface.)

Codex can schedule followups, so once the draft PR is created and the CI
pipeline is running, I'll have it monitor for failures and fix them
automatically.

#### Review

Another category of "things that need action from me" is other peoples' PRs
waiting for reviews. I'll spin up new threads, again in their own worktrees to
avoid conflicts with other local agents, and have the agent pull down and review
the changes. Then I'll read through the PR myself, file by file. When something
isn't clear, I'll ask the agent questions about what's going on and why a
particular decision was made.

The agent's initial review is useful, but often it's missing important context
or fixates on extremely unlikely race conditions. I'll ask it to reproduce any
issues it finds that do sound plausible, and give me reproduction steps.

Then, I'll write my own comments on the PR. I don't let Codex create the
comments directly. I don't mind producing documents with AI, but I prefer to
keep personal communication personal.

### Writing Reports

Besides code, I'm also sometimes asked to produce a scope and estimate for a
project based on sales & discovery calls, or to conduct an assessment by
reviewing code or interviewing staff.

These kinds of reports involve a lot of information gathering. I need to know
the right questions to ask, and what information is going to be relevant for the
report's conclusion. I haven't had great luck with this: AI tends to come up
with plausible busy work instead of insightful targeted questions. For now, I
use AI as a sounding board, but ask my own questions.

Prior to the meeting, I'll use AI to help me prep by compiling a brief based on
what we know about the customer and past similar projects. We usually record our
meetings, so the transcripts provide context for later AI drafting.

Once the information-gathering is done, I usually have a good idea of what the
report's outcome should be. I'll write the executive summary myself. Then I'll
start with an outline, guiding the agent through the process of organizing my
thoughts and evidence in to a structured format. Sometimes I'll have it do
research tasks on the side, proving out the feasibility of an approach or
finding documentation. The agent's job is then to transform my notes, decisions,
and the unstructured evidence we've gathered into a structured report.

With some effort it can produce decent architecture diagrams. Image generation
is still too imprecise and tends to add distracting or inaccurate details. It's
better at drawio diagrams, though I still have to clean up connecting lines
afterward.

Once the report is complete, I'll use AI to review it for correctness and
consistency, just like I do for code. I read it myself, too. I find GPT's
default writing style mildly more palatable than Claudese, but I still tell it
to write in ASD-STE100 Simplified Technical English and give it a few specific
style instructions:

```md
# Communication style

You are concise and practical rather than poetic. Avoid metaphors and analogies.

Use natural prose and restrained formatting. Avoid canned praise, unnecessary
paraphrase, and habitual follow-up offers.

Do not use contrastive reframing as a default rhetorical move. Avoid patterns
like “it’s not X, it’s Y,” “not just X, but Y,” “that’s not X, that’s Y,” and
similar corrective-antithesis constructions unless the contrast is logically
necessary and genuinely clarifies the answer. Prefer direct declarative prose.
Vary sentence structure. When drafting or revising prose, actively check for
this pattern and replace unnecessary instances with plainer wording.
```

### Tech Support

Annoyances that once weren't worth the effort are now easy to solve!

When I connect my earbuds, my Mac switches to make them the default microphone.
But sound quality is better from the built-in mic, so I normally prefer _not_ to
switch. I had Codex write a Mac utility that tracks this and flips it back when
I connect my earbuds.

I've also used Codex for researching what's using all my Docker space, so I can
clean it up; setting up new tools; and troubleshooting Android dev issues.

### Research and Experimentation

Like everyone else, I struggle to stay abreast with the pace of innovation.
Thankfully, AI helps: I've always found that experimentation is the best way to
learn, and it's never been easier to spin up an experiment to explore some new
technology. I'll lean on vibe-coding without shame for these prototypes, mostly
ignoring the experiment harness in order to focus just on the subject I'm
interested in.

Recently I experimented with lip syncing an animated avatar to a live audio
stream. I spun up a control page that could manipulate the different facial
expression components, generate text-to-speech with visemes (mouth shapes that
correspond to phonemes), and fine-tune the different variables. I wasn't
interested in what the code looked like because I was learning about something
else: the relationship between speech, facial expressions, and how we can
portray those in a simplified animation style. AI got the code out of the way so
I could experiment with just that layer.

It's also useful for finding information, but unless it has a verifiable goal
it's working towards, it may give up too early and miss some important context.
Prompting it effectively to find all the information you need, thoroughly, is a
skill in its own right.

## Conclusion

My practices evolve with the capabilities of my tools. I'm pretty happy with
these workflows, though there are a few things I would like to improve.

- A better agentic interface to my Obsidian vault, running in the cloud, not on
  my laptop.
- Better organization of which threads/tasks are still active and relevant and
  which I no longer care about (until I do).
- Flexibility to bring in models from other providers.

I'm beginning to experiment with some new tools beyond the OpenAI ecosystem to
see if I can address some of these. I'll share the successes later!
