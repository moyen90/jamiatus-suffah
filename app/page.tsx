import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CalendarDays, Clock, User, PlusCircle } from "lucide-react"

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
    image: "/placeholder.svg?height=200&width=400",
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
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    slug: "react-server-components",
    title: "Understanding React Server Components",
    excerpt: "A deep dive into React Server Components and how they're changing the way we build React applications.",
    author: "Emily Rodriguez",
    date: "2024-01-10",
    readTime: "10 min read",
    category: "React",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    slug: "web-performance-optimization",
    title: "Web Performance Optimization in 2024",
    excerpt:
      "Essential techniques and tools for optimizing web performance, from Core Web Vitals to advanced optimization strategies.",
    author: "David Kim",
    date: "2024-01-08",
    readTime: "12 min read",
    category: "Performance",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    slug: "typescript-best-practices",
    title: "TypeScript Best Practices for Large Applications",
    excerpt:
      "Learn how to structure and organize TypeScript code in large-scale applications with proven patterns and practices.",
    author: "Alex Thompson",
    date: "2024-01-05",
    readTime: "9 min read",
    category: "TypeScript",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    slug: "modern-css-features",
    title: "Modern CSS Features You Should Know",
    excerpt: "Explore the latest CSS features including container queries, cascade layers, and CSS Grid subgrid.",
    author: "Lisa Wang",
    date: "2024-01-03",
    readTime: "7 min read",
    category: "CSS",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-100 dark:from-blue-950 dark:to-indigo-950 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">Welcome to DevBlog</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Discover the latest insights, tutorials, and best practices in web development, design, and technology.
          </p>
          <Link href="/create">
            <Button size="lg" className="flex items-center gap-2">
              <PlusCircle className="h-5 w-5" />
              Create New Post
            </Button>
          </Link>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Latest Posts</h2>
            <Badge variant="secondary" className="text-sm">
              {blogPosts.length} articles
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{post.category}</Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <div className="flex items-center">
                        <CalendarDays className="w-4 h-4 mr-1" />
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
