"use client"

import { useAuth } from "@/providers/AuthProvider"
import { useGetQuestions } from "@/apis/questions"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { HelpCircle, Mail, User, Clock, MessageSquare, CheckCircle2, AlertCircle } from "lucide-react"

const ADMIN_EMAILS = [
    'dev.moyenislam@gmail.com',
    'muftyrobiulislam@gmail.com'
]

export default function QuestionsDashboard() {
    const { user, loading } = useAuth()
    const router = useRouter()
    const [token, setToken] = useState<string>("")

    useEffect(() => {
        const init = async () => {
            if (!loading && (!user || !ADMIN_EMAILS.includes(user.email || ''))) {
                router.replace("/")
                return
            }

            if (user) {
                const idToken = await user.getIdToken()
                setToken(idToken)
            }
        }
        init()
    }, [user, loading, router])

    const { data: questions, isLoading, isError } = useGetQuestions(token)

    if (loading || !token || isLoading) {
        return (
            <div className="container mx-auto py-32 flex flex-col items-center justify-center min-h-[60vh] space-y-4">
                <div className="relative w-24 h-24">
                    <div className="absolute inset-x-0 inset-y-0 rounded-full border-4 border-black/5 dark:border-white/5"></div>
                    <div className="absolute inset-x-0 inset-y-0 rounded-full border-4 border-t-black dark:border-t-white animate-spin"></div>
                </div>
                <p className="text-black dark:text-white font-black text-sm uppercase tracking-[0.3em] animate-pulse">লোড করা হচ্ছে...</p>
            </div>
        )
    }

    if (isError) {
        return (
            <div className="container max-w-2xl mx-auto py-32 px-4 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-black dark:bg-white text-white dark:text-black mb-10 shadow-2xl">
                    <AlertCircle className="w-10 h-10" />
                </div>
                <h1 className="text-5xl font-black mb-6 tracking-tighter">তথ্য লোড করতে সমস্যা হয়েছে</h1>
                <p className="text-muted-foreground/80 text-xl font-bold leading-relaxed mb-10">সার্ভারের সাথে সংযোগ স্থাপন করা সম্ভব হয়নি। দয়া করে কিছুক্ষণ পর আবার চেষ্টা করুন।</p>
            </div>
        )
    }

    return (
        <div className="container max-w-6xl mx-auto py-24 px-6 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-black/[0.02] dark:bg-white/[0.01] rounded-full blur-[120px] -z-10 pointer-events-none" />

            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000 px-10 md:px-14">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-black dark:text-white text-xs font-black uppercase tracking-[0.3em] shadow-sm">
                            <HelpCircle className="h-4 w-4" />
                            Admin Dashboard
                        </div>
                        <h1 className="text-6xl font-black tracking-tighter leading-none">
                            ব্যবহারকারীর <span className="opacity-40">জিজ্ঞাসাসমূহ</span>
                        </h1>
                    </div>

                    <div className="flex items-center justify-center">
                        <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] flex flex-col items-center justify-center shadow-inner">
                            <span className="text-lg md:text-xl font-black tracking-tighter leading-none">
                                {questions?.length || 0}
                            </span>
                            <span className="text-[5px] md:text-[6px] font-black uppercase tracking-[0.1em] opacity-40 mt-1">মোট প্রশ্ন</span>
                        </div>
                    </div>
                </div>

                <p className="text-muted-foreground/80 text-xl font-bold leading-relaxed max-w-2xl">
                    সবগুলো প্রশ্নের তালিকা এখানে পাওয়া যাবে। উত্তর প্রদান করে ব্যবহারকারীকে সহায়তা করুন।
                </p>
            </div>

            {questions?.length === 0 ? (
                <div className="rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5 p-20 text-center space-y-6">
                    <div className="w-20 h-20 rounded-xl bg-black/5 dark:bg-white/5 flex items-center justify-center mx-auto">
                        <CheckCircle2 className="w-10 h-10 opacity-20" />
                    </div>
                    <p className="text-2xl font-black opacity-30 tracking-tight">কোনো প্রশ্ন পাওয়া যায়নি।</p>
                </div>
            ) : (
                <div className="flex flex-col rounded-xl bg-white/50 dark:bg-black/50 border border-black/5 dark:border-white/5 divide-y divide-black/5 dark:divide-white/5 backdrop-blur-3xl shadow-sm overflow-hidden">
                    {questions?.map((item: any, i: number) => (
                        <div key={i} className="p-8 md:p-10 flex flex-col md:flex-row gap-8 md:items-start group">
                            {/* Index & Icon */}
                            <div className="flex-none">
                                <div className="w-12 h-12 rounded-lg bg-black/5 dark:bg-white/5 flex items-center justify-center text-black/40 dark:text-white/40">
                                    <span className="font-black text-xs">{(i + 1).toString().padStart(2, '0')}</span>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="flex-1 space-y-4">
                                {/* Meta Row */}
                                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[10px] font-black uppercase tracking-[0.15em] opacity-40">
                                    <span className="flex items-center gap-2">
                                        <User className="w-3 h-3" />
                                        {item.userName || "অজানা"}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Clock className="w-3 h-3" />
                                        {item.createdAt ? new Date(item.createdAt).toLocaleDateString('bn-BD') : "তারিখ অজানা"}
                                    </span>
                                </div>

                                {/* Question */}
                                <h3 className="text-xl md:text-2xl font-black leading-snug tracking-tight">
                                    {item.question}
                                </h3>

                                {/* Email (Subtle) */}
                                <div className="flex items-center gap-2 opacity-20 text-[10px] font-mono tracking-wider">
                                    <Mail className="w-3 h-3" />
                                    {item.userEmail || "NO EMAIL"}
                                </div>
                            </div>

                            {/* Status & Actions */}
                            <div className="flex-none md:pt-1 flex flex-col items-end gap-3">
                                <Badge variant="secondary" className="px-5 py-2 rounded-lg bg-black/5 dark:bg-white/5 text-black/40 dark:text-white/40 border border-black/5 dark:border-white/5 font-black text-[9px] uppercase tracking-[0.2em]">
                                    Pending
                                </Badge>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="gap-2 h-9 px-4 text-[10px] uppercase tracking-wider font-bold border-black/10 dark:border-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                                >
                                    <MessageSquare className="w-3 h-3" />
                                    উত্তর দিন
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
