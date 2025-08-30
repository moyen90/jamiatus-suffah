import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">সুফ্ফাহ সেন্টার সম্পর্কে</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              সুফ্ফাহ সেন্টার হলো জামিয়াতুসসুফ্ফাহ-এর অফিসিয়াল ফতোয়া কেন্দ্র, যা কোরআন ও সুন্নাহভিত্তিক নির্ভরযোগ্য ইসলামিক দিকনির্দেশনা প্রদান করে।
            </p>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  To provide developers with practical, up-to-date content that helps them build better applications and
                  advance their careers in web development.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What We Cover</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">React</Badge>
                  <Badge variant="secondary">Next.js</Badge>
                  <Badge variant="secondary">TypeScript</Badge>
                  <Badge variant="secondary">CSS</Badge>
                  <Badge variant="secondary">Performance</Badge>
                  <Badge variant="secondary">Design</Badge>
                </div>
              </CardContent>
            </Card>
          </div> */}

          <Card>
            <CardHeader>
              <CardTitle>আমাদের গল্প</CardTitle>
              <CardDescription>সুফ্ফাহ সেন্টার কিভাবে প্রতিষ্ঠিত হয়েছে</CardDescription>
            </CardHeader>
            <CardContent className="prose prose-gray dark:prose-invert max-w-none">
              <p>ভবিষ্যতে আসছে...</p>
              {/* <p>
                DevBlog was founded by a group of passionate developers who wanted to create a platform for sharing
                knowledge and best practices in web development.
              </p> */}
              {/* <p>
                We believe that the best way to learn is by doing, and our content reflects that philosophy. Every
                article includes practical examples and real-world applications that you can use in your own projects.
              </p>
              <p>
                Our team consists of experienced developers, designers, and technical writers who are committed to
                creating high-quality content that helps our readers succeed in their careers.
              </p> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
