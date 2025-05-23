export interface BlogPostData {
	id: string
	date: string
	category: string
	title: string
	excerpt: string
	tags: string[]
	href?: string
}

export const blogPosts: BlogPostData[] = [
	{
		id: '1',
		date: 'March 15, 2024',
		category: 'Mathematics',
		title: 'On the Fibonacci Spiral in Code Architecture',
		excerpt: `While examining the recursive patterns in tree-shaking algorithms,
			I noticed a curious parallel to the golden ratio found in nautilus
			shells and galaxy formations. The optimal branching factor seems
			to converge on φ ≈ 1.618...`,
		tags: ['recursion', 'algorithms', 'nature'],
	},
	{
		id: '2',
		date: 'March 8, 2024',
		category: 'Astronomy',
		title:
			'Observing Database Orbits: When Transactions Behave Like Celestial Bodies',
		excerpt: `Tonight I traced the elliptical paths of long-running database
			transactions, noting how deadlocks form when two queries approach
			their perihelion simultaneously. The gravitational pull of table
			locks creates fascinating orbital mechanics...`,
		tags: ['databases', 'concurrency', 'performance'],
	},
	{
		id: '3',
		date: 'February 28, 2024',
		category: 'Botany',
		title: 'The Taxonomy of React Components: A Field Guide',
		excerpt: `After months of observation, I've classified component hierarchies
			into distinct species. The Provider component exhibits
			characteristics similar to the mycorrhizal networks in forest
			ecosystems, facilitating nutrient (data) exchange between distant
			organisms (components)...`,
		tags: ['react', 'architecture', 'patterns'],
	},
	{
		id: '4',
		date: 'February 14, 2024',
		category: 'Physics',
		title: 'Entropy and Code: Thermodynamic Laws in Software Systems',
		excerpt: `The second law of thermodynamics suggests that entropy always
			increases in an isolated system. I propose that legacy codebases
			follow similar principles, with technical debt representing the
			inevitable increase in disorder over time...`,
		tags: ['entropy', 'technical-debt', 'philosophy'],
	},
]
