import { Outlet, useLoaderData } from 'react-router'
import { notesBySlug } from 'virtual:notes-metadata'
import { Footer } from '#app/components/Footer'
import { NoteHeader } from '#app/components/NoteHeader'
import { PageLayout } from '#app/components/PageLayout'
import { type NoteMetadata } from '#app/plugins/vite-notes-metadata'
import { type Route } from './+types/notes'

export async function loader({ request }: Route.LoaderArgs) {
	const url = new URL(request.url)
	const pathSegments = url.pathname.split('/')
	const notesIndex = pathSegments.indexOf('notes')

	let noteMetadata: NoteMetadata | null = null

	if (notesIndex !== -1 && notesIndex < pathSegments.length - 1) {
		const slug = pathSegments[notesIndex + 1]
		if (slug) {
			noteMetadata = notesBySlug[slug] || null
		}
	}

	if (!noteMetadata) {
		throw new Response('Not Found', { status: 404 })
	}

	return { noteMetadata }
}

export function meta({ data }: Route.MetaArgs) {
	if (data?.noteMetadata) {
		const note = data.noteMetadata
		return [
			{ title: note.title ? `${note.title} | Field Notes` : 'Field Notes' },
			{
				name: 'description',
				content: note.excerpt || 'Field notes and observations by Jon Winsley',
			},
			...(note.tags
				? [{ name: 'keywords', content: note.tags.join(', ') }]
				: []),
		]
	}

	return [
		{ title: 'Field Notes' },
		{
			name: 'description',
			content: 'The observations and experiments of Jon Winsley',
		},
	]
}

export default function NotesLayout() {
	const { noteMetadata } = useLoaderData<typeof loader>()

	return (
		<PageLayout theme="botany">
			<NoteHeader note={noteMetadata} />

			<main className="mx-auto max-w-4xl px-4 py-4">
				<article className="prose prose-lg dark:prose-invert mx-auto">
					<Outlet />
				</article>
			</main>

			<Footer />
		</PageLayout>
	)
}
