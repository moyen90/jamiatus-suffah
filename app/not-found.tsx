"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-black text-black dark:text-white px-6 py-24 relative overflow-hidden">
            {/* Background Decor - Monochrome Orbs */}
            <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] bg-black/[0.03] dark:bg-white/[0.02] rounded-full blur-[120px] -z-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] bg-black/[0.02] dark:bg-white/[0.01] rounded-full blur-[100px] -z-10 animate-pulse duration-700" />

            <div className="text-center space-y-12 max-w-2xl relative z-10 animate-in fade-in zoom-in duration-1000">
                <div className="relative inline-block">
                    <h1 className="text-[12rem] md:text-[18rem] font-black tracking-tighter leading-none opacity-5 select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 md:w-48 md:h-48 rounded-[3rem] bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-[0_40px_100px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_40px_100px_-15px_rgba(255,255,255,0.1)] transform -rotate-12 transition-transform hover:rotate-0 duration-500">
                            <Search className="w-16 h-16 md:w-24 md:h-24" />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-5xl md:text-6xl font-black tracking-tighter">পৃষ্ঠাটি পাওয়া যায়নি</h2>
                    <p className="text-muted-foreground/80 text-xl md:text-2xl font-bold leading-relaxed max-w-lg mx-auto">
                        দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি খুঁজে পাওয়া সম্ভব হয়নি। পৃষ্ঠাটি হয়তো সরানো হয়েছে অথবা নাম পরিবর্তন করা হয়েছে।
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                    <Link href="/" className="w-full sm:w-auto">
                        <Button size="xl" className="w-full sm:w-auto rounded-[2rem] h-20 px-12 text-xl font-black bg-black dark:bg-white text-white dark:text-black hover:opacity-90 shadow-2xl transition-all active:scale-95 flex gap-3">
                            <Home className="w-6 h-6" />
                            হোমে ফিরে যান
                        </Button>
                    </Link>
                    <Button
                        variant="outline"
                        size="xl"
                        // @ts-ignore - Using history for back navigation
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto rounded-[2rem] h-20 px-12 text-xl font-black glass border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-all active:scale-95 flex gap-3"
                    >
                        <ArrowLeft className="w-6 h-6" />
                        পূর্বের পৃষ্ঠায় যান
                    </Button>
                </div>
            </div>

            {/* Subtle Frame */}
            <div className="fixed inset-0 border-[2rem] border-black/[0.02] dark:border-white/[0.01] pointer-events-none -z-20" />
        </div>
    )
}
