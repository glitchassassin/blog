# SEO Implementation

This project includes comprehensive SEO features to improve search engine
visibility and social media sharing.

## Features Implemented

### 1. Sitemap Generation (`/sitemap.xml`)

The sitemap is automatically generated and includes:

- All static routes discovered from the file system
- All blog posts from MDX files
- Portfolio items
- Category and tag pages

**Location**: `app/routes/sitemap[.]xml.tsx` **Utility**:
`app/utils/sitemap.server.ts`

The sitemap automatically:

- Discovers routes from the file system
- Extracts blog posts from `notes._YYYY-MM-DD.slug.mdx` files
- Extracts portfolio items from `portfolio.slug.mdx` files
- Sets appropriate priorities and change frequencies
- Includes last modification dates for blog posts

### 2. RSS Feed (`/rss.xml`)

An RSS feed is generated for all blog posts, including:

- Post titles and descriptions from frontmatter
- Publication dates
- Full content previews
- Proper RSS 2.0 format with Atom namespace

**Location**: `app/routes/rss[.]xml.tsx`

### 3. Robots.txt (`/robots.txt`)

The robots.txt file includes:

- Sitemap references
- RSS feed reference
- Disallow rules for admin, API, and internal routes

**Location**: `app/routes/robots[.]txt.tsx`

### 4. Meta Tags

Enhanced meta tags for SEO and social sharing:

#### Root Layout (`app/root.tsx`)

- Basic site meta tags
- OpenGraph tags for social sharing
- Twitter Card tags
- RSS feed link
- Author and robots meta tags

#### SEO Utility (`app/utils/seo.ts`)

Provides utilities for generating meta tags for individual pages:

```typescript
import { generateSEOMeta, generateBlogPostMeta } from '../utils/seo'

// For regular pages
export const meta = () =>
	generateSEOMeta({
		title: 'Page Title',
		description: 'Page description',
		url: 'https://example.com/page',
		type: 'website',
	})

// For blog posts
export const meta = () =>
	generateBlogPostMeta(
		'Post Title',
		'Post description',
		'post-slug',
		'2025-01-01',
		['tag1', 'tag2'],
	)
```

## Configuration

Update the following values in the relevant files:

1. **Domain URL**: Update `https://jonwinsley.com` to your actual domain in:

   - `app/routes/sitemap[.]xml.tsx`
   - `app/routes/rss[.]xml.tsx`
   - `app/routes/robots[.]txt.tsx`
   - `app/utils/seo.ts`
   - `app/root.tsx`

2. **Site Information**: Update in `app/utils/seo.ts`:

   - Site name
   - Twitter handle
   - Author name

3. **RSS Feed**: Update in `app/routes/rss[.]xml.tsx`:
   - Feed title
   - Feed description
   - Language

## Testing

You can test the SEO features locally:

```bash
# Test sitemap
curl http://localhost:5173/sitemap.xml

# Test RSS feed
curl http://localhost:5173/rss.xml

# Test robots.txt
curl http://localhost:5173/robots.txt
```

## Search Engine Submission

After deployment, submit your sitemap to search engines:

1. **Google Search Console**: Add your sitemap URL
2. **Bing Webmaster Tools**: Submit your sitemap
3. **Social Media**: Test your OpenGraph tags using:
   - Facebook Sharing Debugger
   - Twitter Card Validator
   - LinkedIn Post Inspector

## Caching

All SEO endpoints include appropriate cache headers:

- Sitemap: 1 hour cache
- RSS feed: 1 hour cache
- Robots.txt: 24 hour cache

This balances freshness with performance while reducing server load.
