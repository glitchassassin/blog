# Blog Project Specification

## Overview

A modern, performant blog built with React, Vite, and AWS infrastructure.
Content is managed through GitHub, with MDX support for rich content creation.

## Tech Stack

- **Frontend Framework**: React Router
- **Styling**: Tailwind CSS + shadcn/ui
- **Content**: MDX
- **Testing**: Playwright (E2E), Vitest
- **Linting/Formatting**: @epic-web/config defaults
- **Infrastructure**:
  - AWS (Lambda, S3, CloudFront)
  - AWS CDK for IaC
- **Package Manager**: npm

## Core Features

### Content Management

- [x] MDX support for rich content
- [x] Custom MDX components
- [x] Code syntax highlighting
- [ ] Image optimization and lazy loading
- [x] Reading time estimates
- [x] Portfolio section
- [x] CV page

### User Interface

- [x] Responsive design
- [x] Dark/Light mode
- [x] Search functionality
- [x] Category/Tag system with paginated lists
- [x] Related posts suggestions
- [x] Accessible navigation

### Performance & SEO

- [-] Static site generation
- [x] SEO optimization
  - [x] Meta tags
  - [x] OpenGraph
  - [x] Twitter cards
- [x] RSS/Atom feed
- [x] Sitemap generation
- [x] Performance monitoring
- [x] Caching strategies

### Developer Experience

- [x] Hot reloading
- [x] TypeScript support
- [x] ESLint configuration
- [x] Prettier configuration
- [x] Automated testing
- [x] CI/CD pipeline
- [x] Automated dependency updates
- [x] Development documentation

### Security

- [-] Content Security Policy
- [x] HTTPS enforcement
- [-] Rate limiting
- [-] DDoS protection

### Accessibility

- [x] ARIA labels
- [x] Keyboard navigation
- [x] Screen reader support
- [x] Color contrast compliance

## Development Workflow

1. Content creation through GitHub
2. Local development with hot reloading
3. Automated testing
4. Infrastructure deployment:
   - [x] AWS CDK for infrastructure provisioning
   - [x] Automated deployment through GitHub Actions
   - [x] Infrastructure changes tracked in version control
5. Application deployment:
   - [x] Build and package application
   - [x] Deploy via CDK
   - [ ] Run post-deployment tests

## Deployment

### Infrastructure (AWS CDK)

- [x] Infrastructure as Code using AWS CDK
- Stack includes:
  - [x] S3 bucket for static hosting
  - [x] CloudFront distribution
  - [x] Lambda functions
- [x] Parameterized for PR-specific deployments

### Application

- [x] AWS Lambda for serverless functions
- [x] S3 for static asset hosting
- [x] CloudFront for CDN and caching
- [x] GitHub Actions for CI/CD

## Performance Targets

- [x] Lighthouse score > 90
- [x] First Contentful Paint < 1.5s
- [x] Time to Interactive < 3.5s
- [x] Cumulative Layout Shift < 0.1

## Monitoring

- [x] Performance metrics
- [x] Error tracking
