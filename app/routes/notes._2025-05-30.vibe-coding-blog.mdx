---
title: 'Vibe Coding a New Stack'
date: May 30, 2025
excerpt: 'In the time-honored tradition of dev blogs, I may have gone a little bit overboard. But, importantly, I had fun with it.'
category: ai
---

You may have noticed some changes around here.

[The old version of my blog](https://github.com/glitchassassin/jonwinsley.com/) was built more than six years ago with Jekyll and a cool theme [I borrowed from Jacob Tomlinson](https://github.com/jacobtomlinson/carte-noire).

It worked all right, but it wasn't really _fun_ to tinker with. So, when the CSS on the post titles started going wonky, I decided it was time for something new. In the time-honored tradition of dev blogs, I may have gone a little bit overboard. But, importantly, I had fun with it.

# Vibe Coding And You

I have been loving every minute of the AI revolution. Early on I was a huge fan of Cursor's Tab model, which combined fast AI-generated autocomplete with a psychic ability to predict where you wanted to make changes next. As models improved, I've found myself more and more relying on agent mode, giving natural-language directions and letting the AI make the changes.

It's not _quite_ [vibe coding in the technical sense](https://x.com/karpathy/status/1886192184808149383?lang=en). Since I aim to enjoy working on this codebase, I am still micro-managing the AI's output. Some things, like the specifics of the DOM structure and Tailwind classes, I pay less attention to; others, like code organization and types, I care about more. And, of course, I want to make sure that the overall architecture makes sense.

## Starting With a Spec

So, I started with asking Cursor to generate a spec:

> I need to rewrite my blog and would like to start from scratch with a new stack. Let's begin by creating some specs to define the blog.
>
> We'll use React Router hosted by AWS Lambda and S3, fronted by CloudFront. Tailwind and shadcn for styling. We'll support MDX for dynamic Markdown. Publishing will all be through GitHub by editing the source, so we don't need a database persistence layer. What other features am I missing?

I went back and forth with it a little bit to flesh out the list of technologies and features I wanted to include and [recorded it to Markdown.](https://github.com/glitchassassin/blog/blob/main/docs/system-spec.md)

The list wasn't perfect, but that's okay; it gave me a place to start, and I refined the list as I went along.

## Breaking Down the Tasks

The spec became my working project plan. For each new feature, I'd either ask for an implementation plan, or (when I knew exactly what I wanted) write a temporary TODO.md file that spelled it out.

Then, I'd iterate: the initial design was surprisingly okay, but the color schemes were off, so I spent some time manually tweaking things until I got a look I liked. Then I handed it back to the AI to split things up into components and continue building.

Where possible, I linked to examples from documentation or other repos that described what I was after - AI works much better when it can follow an example.

Sometimes, the AI surprised me by suggesting an approach I hadn't considered. I started with [Pedro Cattori's Remix/MDX blog example](https://github.com/pcattori/remix-blog-mdx/), and it inspired me to add a Vite plugin with a virtual module that indexes the metadata from MDX files - a clever way to generate the indexes of posts dynamically at build time.

# Reducing Friction

The ideal side project is low-friction. When I get a few minutes free, I should be able to spend a little time and make a little headway, without spending forever getting back up to speed.

Breaking down the project into bite-sized chunks is a part of this. The spec made it easy to see which feature I ought to pick up next. Then, as I had time, I could give Cursor some specific instructions, review its work, or request changes. The active chat made it easy to catch up instantly with what I was working on last - on my own, I don't take good progress notes!

Cursor helps with analysis paralysis, too. I'll kick off a feature with a discussion:

> What does accessible navigation mean for my blog, and how can I test it?

It immediately jumps into an overview, and then suggests specific packages or implementation strategies. Often, the ideas are good enough to just roll with. Sometimes I check these out and reject them, but they give me enough ideas that finding the actual best solution is easier.

While implementing accessibility tests, Cursor added `ring` classes for focused elements. I didn't like the way the ring-offset looked (it was using a default background color instead of the actual page's background color), so I dug in further and asked questions.

> what does the ring-offset do here?

> any particular reason to use ring instead of outline here?

Cursor said that `outline` didn't support offsets and wasn't good with rounded corners, but I knew from looking at the Tailwind docs this wasn't true (or, at least, not any longer). I did a quick search [to confirm my suspicions](https://stackoverflow.com/questions/75649221/whats-the-difference-between-outline-and-ring-in-tailwind). Then, I provided some up-to-date sources:

> In tailwind 4, and modern browsers, outline does support offsets:
>
> @https://tailwindcss.com/docs/outline-offset  
> @https://tailwindcss.com/docs/outline-color
>
> Let's switch the focus styling to outline instead of ring, so we don't need to worry about the color of the ring offsets

Cursor happily updated everything to follow the new pattern. For the future, I also added a note to my `best-practices` Cursor rule, since the model didn't get it right initially:

> Prefer "outline" styles for focused elements over "ring"

# Conclusion

Working well with the new AI tools requires a new way of thinking and a new way of working, but the same old attention to detail and best practices. All the old rules about what makes a codebase "maintainable" still apply - but now, the work is shifting to documenting, organizing, and reviewing the work, as implementation becomes more automatic.

This is going to hit everyone differently, but I'm loving it. I enjoy the high-level planning, thinking through features and deciding on the best strategy. I like that I can rapidly try one approach to a problem, then scrap it and quickly spin up a new one with the lessons learned. Experimentation and exploration become faster. More of my decisions and best practices are being recorded rather than forgotten.

And it is fun!
