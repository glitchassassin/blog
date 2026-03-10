import { writeFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const routesDir = join(__dirname, '..', 'app', 'routes')

const today = new Date()
const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, '0')
const day = String(today.getDate()).padStart(2, '0')
const dateStr = `${year}-${month}-${day}`

const dateLabel = today.toLocaleDateString('en-US', {
	month: 'long',
	day: 'numeric',
	year: 'numeric',
})

let slug = 'untitled'
let filename = `notes._${dateStr}.${slug}.mdx`
let filepath = join(routesDir, filename)

let counter = 2
while (existsSync(filepath)) {
	slug = `untitled-${counter}`
	filename = `notes._${dateStr}.${slug}.mdx`
	filepath = join(routesDir, filename)
	counter++
}

const content = `---
title: Untitled
date: ${dateLabel}
excerpt:
category:
tags: []
draft: true
---

`

writeFileSync(filepath, content)
console.log(`Created draft: app/routes/${filename}`)
