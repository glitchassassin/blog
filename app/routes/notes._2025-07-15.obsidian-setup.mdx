---
title: 'My Obsidian Setup'
date: July 15, 2025
excerpt: I use Obsidian to capture notes, organize tasks & projects (mostly outside of work), and develop longer-form content. Here's what that looks like.
category: productivity
---

I always flip-flop between digital and physical notebooks. Productivity systems should always be evolving as your unique life does. Physical notebooks feel great, but I can't help feeling like I'm messing them up when I try to iteratively develop an organization system that works for me. So, I tend to fall back to digital with [Obsidian](https://obsidian.md/).

I use Obsidian to capture notes, organize tasks & projects (mostly outside of work), and develop longer-form content. Here's what that looks like.

```
- Archive
- Inbox
- Projects
- Seedbed
Attachments
Daily Notes
Rituals
```

## The Workflows

Many things start with a quick note: jot down a reminder to myself, someone's name, a grocery list, etc. I use Obsidian's built-in Unique Note Creator plugin to auto-create these in an `- Inbox/` folder. If I paste in an image, it gets dropped in the "Attachments" folder automatically (Obsidian settings).

On a daily basis, I review these and process them into a Project, a Seedbed note, my task list in my Daily Note (more on this in a bit), or straight to Archive (if it's no longer needed).

Projects are a longer-form note with a "Next Steps" checklist and anything else that's relevant: meeting notes, ideas, resources, drafts, etc. The only defined structure is the "next steps" checklist, which should be exactly that: what's next on this endeavor?

The Seedbed is a temporary place for notes that need more thought. They are reviewed on a daily basis; I might decide to add more ideas to the note, do a little more research, or eventually promote it to a project.

Archive is where everything gets shoved when I'm done with it. Why delete stuff when storage is cheap? Then, it's searchable if I need to find something again.

## Daily Kickoff Ritual

Productivity systems are most useful if you actually review them regularly. To that end, I have a Daily Kickoff Ritual (documented under `Rituals/`):

```md
> [!tip] Purpose
> The Daily Kickoff ritual helps me to glorify God by diligently and thoroughly tracking and then fulfilling my responsibilities.

## Process

- **Review Inbox:** Process items into Seedbed, Archive, Projects, etc.
- **Cultivate Seedbed:** Decide if any items should be moved to Projects, pruned, or enriched with new ideas or connections
- **Review Projects:** Update current project status, archiving if completed; make sure next actions are clear
- **Daily Planning:** Review emails and Azure DevOps tickets; make sure Priorities are up to date
- **Review Calendar:** Update the Time Log section with scheduled events; block time for priority tasks
- **Move around:** Stretch and hydrate
- **Commit the day to the Lord:** Pray over the day's work
```

Why is it documented like this, you ask? Because I use Cursor to run the ritual interactively! I'll set today's daily note and the Daily Kickoff Ritual as the context and ask it to run through the ritual. I find being explicitly prompted gives me a little more motivation (especially since the process has so many opportunities for distraction).

![A split-screen view showing the Daily Kickoff Ritual note in Obsidian on the left and a Cursor chat window on the right](/assets/images/obsidian-with-cursor.png)

Here's my Cursor rule for running rituals (kept in the `.cursor/rules/` directory inside the Obsidian vault):

```md
Role: You are a personal assistant, friendly but concise, guiding the user through a documented ritual step-by-step. Prompt the user conversationally for each step, one at a time, and wait to move on until the user indicates he is ready. It's VERY IMPORTANT to only present ONE step and wait for the user to complete it.

Use imperatives (e.g., "stand up") rather than questions (e.g. "would you like to stand up?") for each step. Always expect the user to make any changes manually, unless the user makes a specific request.
```

## Daily Notes

The Daily Note mostly follows the kickoff ritual. I have a Daily Note template with some custom [Templater](https://github.com/SilentVoid13/Templater) scripts to inject an index of my Inbox, Seedbed, and Projects folders so I have a checklist to review. This gets calculated and filled in automatically when the new Daily Note file is created:

```js
<%*
function indexFromFolder(folderName) {
	const inboxFolder = app.vault.getFolderByPath(folderName);
	if (!inboxFolder) return "";

	const notes = inboxFolder.children.filter(
	  (file) => !file.name.startsWith("-")
	)
	return notes.map(note => `- [ ] [[${note.path}|${note.basename}]]`).join("\n")
}

function embedsFromFolder(folderName, section) {
	const folder = app.vault.getFolderByPath(folderName);
	if (!folder) return "";

	const notes = folder.children.filter(
	  (file) => !file.name.startsWith("-")
	)
	return notes.map(note => `## ${note.basename}\n![[${note.path}#${section}]]`).join("\n")
}
%>
# Inbox

<%*
tR += indexFromFolder("- Inbox") || "- Done!";
%>
```

The Projects section injects embeds, including the whole "Next Steps" section for each project.

Then, I have a "Priorities" to-do checklist, which gets copied wholesale from the previous day's Daily Note when it gets created:

```js
# Priorities

<%*
const notesFolder = app.vault.getFolderByPath("Daily Notes");
let resolved = false;
if (notesFolder) {
	const today = new Date().toLocaleDateString("sv-SE").slice(0, 10);
	const lastNote = notesFolder.children.filter(
	  (file) => file.name.startsWith("202") && !file.name.startsWith(today)
	)
	.reduce((prev, cur) => (!prev || prev.name < cur.name ? cur : prev), null);
	if (lastNote) {
	console.log(today, lastNote);
		const contents = await app.vault.read(lastNote);
		tR += contents.split("# Priorities")[1].split("# Time Log")[0].trim();
		resolved = true;
	}
}
if (!resolved) {
  tR += "- \n";
}
%>
```

Finally, I have a Time Log for the Day Planner plugin. As part of the kickoff ritual, I go through and update the Time Log with my day's meetings. This mostly helps me set my expectations for the day up front. If I have meetings around a particular project, I may create a heading in the project's note for the meeting notes, and link to it from the Time Log.

## Useful Plugins

I rely regularly on Obsidian's built-in Daily Notes and Unique Note Creator plugins.

[Templater](obsidian://show-plugin?id=templater-obsidian) (discussed above) is really handy for enhancing templates with snippets of Javascript. [Dataview](obsidian://show-plugin?id=dataview) has been useful as well, though I'm not using it for my current workflows. [Day Planner](obsidian://show-plugin?id=obsidian-day-planner) is a nice visualization of the day's Time Log.

I like [Advanced Tables](obsidian://show-plugin?id=table-editor-obsidian) and [Kanban](obsidian://show-plugin?id=obsidian-kanban) for giving a little more structure to my notes.

Finally, the [Copy As HTML](obsidian://show-plugin?id=copy-as-html) plugin, though unmaintained, is really useful for copying Markdown as rich text to paste into Slack or other apps.

And... I think that's the gist of it for now!
