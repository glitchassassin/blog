import { Outlet, useLoaderData } from 'react-router'
import { notesBySlug, getRelatedNotes } from 'virtual:notes-metadata'
import { Footer } from '#app/components/Footer'
import { MDXContent } from '#app/components/mdx/MDXContent'
import { NoteHeader } from '#app/components/NoteHeader'
import { PageLayout } from '#app/components/PageLayout'
import { RelatedNotes } from '#app/components/RelatedNotes'
import { SITE_DESCRIPTION, SITE_TITLE } from '#app/data'
import { type NoteMetadata } from '#app/plugins/vite-notes-metadata'
import { generateSEOMeta } from '#app/utils/seo'
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
	const relatedNotes = getRelatedNotes(noteMetadata, 3)

	return {
		noteMetadata,
		relatedNotes,
	}
}

export function meta({ data, location, matches }: Route.MetaArgs) {
	const domainUrl = matches[0].data.domainUrl ?? 'https://jonwinsley.com'
	const url = domainUrl + location.pathname

	return generateSEOMeta({
		title: data?.noteMetadata?.title
			? `${data.noteMetadata.title} | ${SITE_TITLE}`
			: SITE_TITLE,
		description: data?.noteMetadata?.excerpt || SITE_DESCRIPTION,
		url,
		type: 'article',
		publishedTime: data?.noteMetadata?.date
			? new Date(data.noteMetadata.date).toISOString()
			: undefined,
		tags: data?.noteMetadata?.tags,
	})
}

export default function NotesLayout() {
	const { noteMetadata, relatedNotes } = useLoaderData<typeof loader>()

	return (
		<PageLayout theme="botany">
			<NoteHeader note={noteMetadata} />

			<main className="mx-auto max-w-4xl px-4 py-4">
				<article className="prose prose-lg dark:prose-invert mx-auto">
					<MDXContent>
						<Outlet />
					</MDXContent>
				</article>

				<RelatedNotes relatedNotes={relatedNotes} />
			</main>

			<Footer />
		</PageLayout>
	)
}
