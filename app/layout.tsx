import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import Link from "next/link"
import { PlusCircle } from "lucide-react"
import { Providers } from './../providers/Providers';
const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DevBlog - Web Development Insights",
  description:
    "Discover the latest insights, tutorials, and best practices in web development, design, and technology.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            {/* Navigation */}
            <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
              <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-2xl text-gray-900 dark:text-white">
                  DevBlog
                </Link>

                <div className="flex items-center space-x-4">
                  <Link href="/">
                    <Button variant="ghost">Home</Button>
                  </Link>
                  <Link href="/about">
                    <Button variant="ghost">About</Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="ghost">Contact</Button>
                  </Link>
                  <Link href="/create">
                    <Button variant="default" className="hidden md:flex items-center gap-2">
                      <PlusCircle className="h-4 w-4" />
                      Create Post
                    </Button>
                    <Button variant="default" size="icon" className="md:hidden">
                      <PlusCircle className="h-4 w-4" />
                    </Button>
                  </Link>
                  <ModeToggle />
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <main className="min-h-[90vh]">{children}</main>

            {/* Footer */}
            <footer className="border-t bg-gray-50 dark:bg-gray-900">
              <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                  <div className="col-span-1 md:col-span-2">
                    <h3 className="font-bold text-xl mb-4">DevBlog</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      Your go-to resource for web development insights, tutorials, and best practices.
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Quick Links</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li>
                        <Link href="/" className="hover:text-gray-900 dark:hover:text-white">
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link href="/about" className="hover:text-gray-900 dark:hover:text-white">
                          About
                        </Link>
                      </li>
                      <li>
                        <Link href="/contact" className="hover:text-gray-900 dark:hover:text-white">
                          Contact
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-4">Categories</h4>
                    <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                      <li>
                        <Link href="#" className="hover:text-gray-900 dark:hover:text-white">
                          Development
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-gray-900 dark:hover:text-white">
                          Design
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-gray-900 dark:hover:text-white">
                          React
                        </Link>
                      </li>
                      <li>
                        <Link href="#" className="hover:text-gray-900 dark:hover:text-white">
                          TypeScript
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border-t mt-8 pt-8 text-center text-gray-600 dark:text-gray-300">
                  <p>&copy; 2024 DevBlog. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  )
}
