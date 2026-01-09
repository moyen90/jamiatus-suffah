"use client"

import * as React from "react"
import Link from "next/link"
import { Calendar, ArrowRight, User, ScrollText } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ModernBlogCardProps {
    uid: string
    title: string
    excerpt?: string
    date?: string
    author?: string
    categories?: string[]
    readTime?: string
}

export const ModernBlogCard = ({
    uid,
    title,
    excerpt = "মাসালা-মাসায়েল সম্পর্কে বিস্তারিত জানতে পড়ুন...",
    date = "৯ জানুয়ারি, ২০২৬",
    author = "আলেম পরিষদ",
    categories = ["সাধারণ"],
    readTime = "৫ মিনিট",
}: ModernBlogCardProps) => {
    return (
        <Link href={`/blog/${uid}`} className="group block h-full">
            <Card className="h-full overflow-hidden border border-primary/5 glass-card transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col p-8 md:p-10">
                <div className="flex-1 space-y-6">
                    <div className="flex flex-wrap items-center gap-3">
                        {categories.map((cat, i) => (
                            <Badge key={i} variant="secondary" className="bg-primary/5 text-primary border-none font-bold px-3 py-1 rounded-lg">
                                {cat}
                            </Badge>
                        ))}
                        <span className="text-muted-foreground/30 text-xs font-black uppercase tracking-widest">{readTime}</span>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-2xl md:text-3xl font-black leading-tight group-hover:text-primary transition-colors duration-300">
                            {title}
                        </h3>
                        <p className="text-muted-foreground text-lg leading-relaxed line-clamp-3 font-medium">
                            {excerpt}
                        </p>
                    </div>
                </div>

                <div className="pt-10 mt-auto">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                <User size={18} strokeWidth={2.5} />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-bold text-foreground">{author}</span>
                                <span className="text-xs font-medium text-muted-foreground">{date}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 text-primary font-bold text-sm group-hover:gap-4 transition-all duration-300">
                            বিস্তারিত পড়ুন
                            <ArrowRight size={18} strokeWidth={3} />
                        </div>
                    </div>
                </div>

                {/* Subtle decorative accent */}
                <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
                    <ScrollText size={120} strokeWidth={1} />
                </div>
            </Card>
        </Link>
    )
}
