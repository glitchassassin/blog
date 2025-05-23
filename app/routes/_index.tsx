import { notes } from 'virtual:notes-metadata'
import { BlogPost } from '#app/components/BlogPost'
import { Footer } from '#app/components/Footer'
import { Header } from '#app/components/Header'
import { PageLayout } from '#app/components/PageLayout'
import { type Route } from './+types/_index'

export function meta({}: Route.MetaArgs) {
	return [
		{ title: 'Field Notes' },
		{
			name: 'description',
			content: 'The observations and experiments of Jon Winsley',
		},
	]
}

export default function Home() {
	return (
		<PageLayout theme="botany">
			<Header />

			{/* Sample Posts */}
			<main className="space-y-12">
				{notes.map((post) => (
					<BlogPost
						key={post.filePath}
						date={post.date ?? ''}
						category={post.category ?? ''}
						title={post.title ?? ''}
						excerpt={post.excerpt ?? ''}
						tags={post.tags ?? []}
						href={`/notes/${post.slug}`}
					/>
				))}
			</main>

			<Footer />
		</PageLayout>
	)
}
