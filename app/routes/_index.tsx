import { BlogPost } from '#app/components/BlogPost'
import { Footer } from '#app/components/Footer'
import { Header } from '#app/components/Header'
import { PageLayout } from '#app/components/PageLayout'
import { blogPosts, type BlogPostData } from '#app/data/blogPosts'
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
				{blogPosts.map((post: BlogPostData) => (
					<BlogPost
						key={post.id}
						date={post.date}
						category={post.category}
						title={post.title}
						excerpt={post.excerpt}
						tags={post.tags}
						href={post.href}
					/>
				))}
			</main>

			<Footer />
		</PageLayout>
	)
}
