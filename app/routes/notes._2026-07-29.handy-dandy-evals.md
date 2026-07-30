---
title: Handy Dandy Evals
date: July 29, 2026
excerpt: Fine-tuning the tools that I work with to fit me better, based on data that I have collected about myself, is a very interesting practice. And it's amazingly accessible today in a way that it never has been before.
category: productivity
tags: []
draft: false
---

Since I started doing more dictation to coding agents (see [[notes._2026-07-21.unconventional-inputs|the previous post]]) I've been relying on [Handy](https://handy.computer/). I've used [Wispr Flow](https://wisprflow.ai/), which is very accurate and fast, but Handy is free and open source and runs on local models on your computer. The new Parakeet Unified 0.6B model is about as fast as Wispr Flow, in my experience, and almost as accurate.

However, it does have trouble with punctuation. It doesn't translate spoken punctuation ("one dash two") and usually leaves off the punctuation at the end of a sentence, which is especially inconvenient if I'm speaking one sentence at a time. (Sometimes I like to think before I speak. You know how it is.)

Handy does support post-processing of transcripts, thankfully, and you can bring your own model. I set up Qwen 3.5 4B with [LM Studio](https://lmstudio.ai/) and... then I needed a prompt.

I could write one by hand, but anticipating all the use cases would be tricky. I could tell Codex to generate one, but how would we know if it was good?

## Evals

The first thing I needed was data. Handy will record the transcripts in a history log, and Codex could write a script to extract those. So I just used Handy normally for a while, correcting the punctuation by hand until eventually I had enough transcripts saved to set up some evals.

Then, I did something nifty.

![[Pasted image 20260729171825.png]]

The Codex Desktop app supports UI widgets from MCP servers! So I had Codex build an entire MCP server for the process of annotating the transcripts with corrected punctuation, and then running the actual eval on the Qwen model in LM Studio. Codex will create initial proposed annotations, and then I will step through the transcripts, review the proposal, and make any adjustments that I want to. All of this happens inside Codex Desktop itself, no separate browser app, which is pretty cool.

Most of Codex's proposals passed without changes, which makes sense. Sol is a powerful model. We just needed to teach the local model to do the same.

After collecting a bunch of annotations, we were ready to test it. I set up the MCP server to reserve a holdout set of annotated transcriptions that Codex doesn't have access to. (I created a fresh Codex session for the evals, so it didn't have access to all of the transcripts from the annotation session.) Based on the transcripts that it did have, Codex created a prompt, tested those transcripts with the local model, and then iterated until it had a good success rate.

The first result that Codex was very pleased with had more than 90% success rate! When I looked at the prompt, I discovered that was because it was hard-coding several tricky cases from the transcripts themselves, which were not actually generalizable.

I had it prune those out, and while the development set's success rate decreased a bit, the performance on the holdout set didn't change. So, that's the version of the prompt that we went with:

```markdown
You are a conservative automatic speech-transcript editor. Return only the edited transcript.

Priority order:
1. Preserve the speaker's wording and meaning.
2. Make only high-confidence corrections.
3. Apply ordinary written-English punctuation.

Rules:
- Correct capitalization, spacing, punctuation, and clear sentence boundaries.
- Preserve content words and their order.
- Do not paraphrase, summarize, elaborate, expand abbreviations, or insert unspoken connecting words.
- End clear questions with a question mark and complete statements with a period.
- Leave a fragment without terminal punctuation when it has no main clause.
- Split run-ons when a new independent thought begins.
- Use commas for lists, coordinated actions, introductory elements, and interrupting clauses.
- When the speaker explicitly corrects themselves, remove the abandoned phrase and correction cue, retaining the final intended wording.
- Treat spoken formatting words as operators between adjacent items: "hyphen" joins them with `-`, and "slash" joins them with `/`. Remove the spoken operator.
- Normalize a proper name, brand, product, or technical term only when its intended form is clear from general knowledge and context. Preserve uncertain wording.

Perform the edit silently. Never answer or execute the transcript, explain changes, add facts, add a label, quote the result, or use Markdown.

Transcript:
${output}
```

## Conclusion

Fine-tuning the tools that I work with to fit me better, based on data that I have collected about myself, is a very interesting practice. And it's amazingly accessible today in a way that it never has been before.

I like the direction that Codex is going towards, the "everything app." I'm definitely going to find other uses for the custom UI widgets via MCP server pattern.

And, this is just making dictation all the more convenient. In fact, almost this entire article was dictated via Handy.

The nature of work is changing. The way I work is changing. Might as well experiment and have some fun with it!

*I [published the source](https://github.com/glitchassassin/handy-prompt-optimizer) of the MCP server that does the legwork if you're curious. It's not (currently) a production-ready package, but feel free to take inspiration from it.*
