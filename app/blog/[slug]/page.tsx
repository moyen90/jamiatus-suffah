import { notFound } from "next/navigation"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, User, ArrowLeft } from "lucide-react"

// Sample blog data - in a real app, this would come from a CMS or database
const blogPosts = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with Next.js 15: A Complete Guide",
    excerpt:
      "Learn how to build modern web applications with Next.js 15, including the latest features and best practices for developers.",
    author: "Sarah Johnson",
    date: "2024-01-15",
    readTime: "8 min read",
    category: "Development",
    image: "/placeholder.svg?height=400&width=800",
    content: `
# Getting Started with Next.js 15: A Complete Guide

Next.js 15 brings exciting new features and improvements that make building React applications even more powerful and developer-friendly. In this comprehensive guide, we'll explore everything you need to know to get started with Next.js 15.

## What's New in Next.js 15

Next.js 15 introduces several groundbreaking features:

### 1. Enhanced App Router
The App Router continues to evolve with better performance and new capabilities. The file-based routing system now supports more advanced patterns and provides better developer experience.

### 2. Improved Server Components
React Server Components have been optimized for better performance and easier debugging. You can now build more efficient applications with less client-side JavaScript.

### 3. Better TypeScript Support
TypeScript integration has been enhanced with better type inference and more helpful error messages.

## Setting Up Your First Next.js 15 Project

Getting started with Next.js 15 is straightforward:

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

This will create a new Next.js application with all the latest features enabled by default.

## Key Features to Explore

### File-Based Routing
Next.js uses a file-based routing system where the file structure in your \`app\` directory determines your application's routes.

### Server and Client Components
Understanding when to use Server Components vs Client Components is crucial for building efficient applications.

### Data Fetching
Next.js provides multiple ways to fetch data, from static generation to server-side rendering.

## Best Practices

1. **Use Server Components by default** - Only use Client Components when you need interactivity
2. **Optimize images** - Use the built-in Image component for better performance
3. **Implement proper SEO** - Take advantage of Next.js's built-in SEO features
4. **Monitor performance** - Use the built-in analytics and monitoring tools

## Conclusion

Next.js 15 represents a significant step forward in React development. With its powerful features and excellent developer experience, it's an excellent choice for building modern web applications.

Whether you're building a simple blog or a complex web application, Next.js 15 provides the tools and performance you need to succeed.
    `,
  },
  {
    slug: "mastering-tailwind-css",
    title: "Mastering Tailwind CSS: Tips and Tricks",
    excerpt:
      "Discover advanced Tailwind CSS techniques to create beautiful, responsive designs with utility-first CSS framework.",
    author: "Mike Chen",
    date: "2024-01-12",
    readTime: "6 min read",
    category: "Design",
    image: "/placeholder.svg?height=400&width=800",
    content: `
# Mastering Tailwind CSS: Tips and Tricks

Tailwind CSS has revolutionized how we approach styling in modern web development. This utility-first CSS framework allows developers to build custom designs without writing custom CSS.

## Advanced Tailwind Techniques

### 1. Custom Color Palettes
Create consistent color schemes across your application:

\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        }
      }
    }
  }
}
\`\`\`

### 2. Responsive Design Patterns
Tailwind makes responsive design intuitive with its mobile-first approach.

### 3. Component Composition
Learn how to compose reusable components using Tailwind utilities.

## Performance Optimization

Tailwind's purge feature ensures only used styles are included in your final bundle, keeping your CSS lightweight and fast.

## Conclusion

Mastering Tailwind CSS opens up new possibilities for rapid, maintainable styling in your web applications.
    `,
  },
  // Add more blog posts as needed
]

interface BlogPostPageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="container mx-auto px-4 py-6">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blog
          </Button>
        </Link>
      </div>

      {/* Hero Image */}
      <div className="container mx-auto px-4 mb-8">
        <div className="aspect-video overflow-hidden rounded-lg">
          <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Article Content */}
      <article className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Article Header */}
          <header className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="outline">{post.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {post.readTime}
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">{post.excerpt}</p>

            <div className="flex items-center justify-between text-sm text-muted-foreground border-t border-b py-4">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-1" />
                <span className="font-medium">{post.author}</span>
              </div>
              <div className="flex items-center">
                <CalendarDays className="w-4 h-4 mr-1" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </div>
            </div>
          </header>

          {/* Article Body */}
          <div className="prose prose-gray max-w-none dark:prose-invert prose-lg">
            <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br />") }} />
          </div>
        </div>
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}
