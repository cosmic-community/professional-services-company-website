# LFG Cosmic

![Company Website Preview](https://imgix.cosmicjs.com/8d5400f0-64e0-11f0-a051-23c10f41277a-photo-1556742049-0cfed4f6a45d-1752957601453.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, professional company website showcasing services, team members, case studies, and client testimonials. Built with Next.js 15 and powered by [Cosmic](https://www.cosmicjs.com).

## Features

- 🎯 **Dynamic Service Portfolio** - Showcase your services with detailed descriptions and pricing
- 👥 **Team Directory** - Professional team member profiles with photos and bios
- 📊 **Case Studies** - Highlight successful projects with metrics and results
- ⭐ **Client Testimonials** - Display client feedback with star ratings
- 📱 **Fully Responsive** - Optimized for desktop, tablet, and mobile devices
- ⚡ **Fast Performance** - Built with Next.js 15 for optimal speed and SEO
- 🎨 **Modern Design** - Clean, professional aesthetic with Tailwind CSS

## Clone this Bucket and Code Repository

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Bucket and Code Repository](https://img.shields.io/badge/Clone%20this%20Bucket-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=687c020aace2d34c4e9597e6&clone_repository=687c0382ace2d34c4e959805)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a company website with services, team members, testimonials, and case studies"

### Code Generation Prompt

> Build a Next.js website that uses my existing objects in this bucket. Set apiEnvironment: staging in cosmic config

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[Cosmic](https://www.cosmicjs.com)** - Headless CMS for content management
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Bun](https://bun.sh/)** - Fast JavaScript runtime and package manager

## Getting Started

### Prerequisites

- Bun installed on your machine
- A Cosmic account and bucket with your content

### Installation

1. Clone this repository:
```bash
git clone <repository-url>
cd professional-services-website
```

2. Install dependencies:
```bash
bun install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Add your Cosmic credentials to `.env.local`:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

5. Run the development server:
```bash
bun run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Cosmic SDK Examples

### Fetching Services
```typescript
import { cosmic } from '@/lib/cosmic'

const services = await cosmic.objects
  .find({ type: 'services' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Team Members
```typescript
import { cosmic } from '@/lib/cosmic'

const teamMembers = await cosmic.objects
  .find({ type: 'team-members' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Case Studies
```typescript
import { cosmic } from '@/lib/cosmic'

const caseStudies = await cosmic.objects
  .find({ type: 'case-studies' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching Testimonials
```typescript
import { cosmic } from '@/lib/cosmic'

const testimonials = await cosmic.objects
  .find({ type: 'testimonials' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)