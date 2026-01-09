"use client"

import { useAuth } from "@/providers/AuthProvider"
import { useGetQuestions } from "@/apis/questions"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, Mail, User, Clock, Trash2, CheckCircle2, AlertCircle } from "lucide-react"

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

            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-black dark:text-white text-xs font-black uppercase tracking-[0.3em] shadow-sm">
                            <HelpCircle className="h-4 w-4" />
                            Admin Dashboard
                        </div>
                        <h1 className="text-6xl font-black tracking-tighter leading-none">
                            ব্যবহারকারীর <span className="opacity-40">জিজ্ঞাসাসমূহ</span>
                        </h1>
                        <p className="text-muted-foreground/80 text-xl font-bold leading-relaxed max-w-2xl">
                            সবগুলো প্রশ্নের তালিকা এখানে পাওয়া যাবে। উত্তর প্রদান করে ব্যবহারকারীকে সহায়তা করুন।
                        </p>
                    </div>

                    <div className="p-8 rounded-[2.5rem] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 backdrop-blur-xl flex flex-col items-center justify-center text-center w-full md:w-auto">
                        <p className="text-4xl font-black tracking-tighter">{questions?.length || 0}</p>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-30 mt-1">মোট প্রশ্ন</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-8">
                    {questions?.length === 0 ? (
                        <Card className="border border-black/5 dark:border-white/5 bg-white/50 dark:bg-black/50 backdrop-blur-3xl rounded-[3rem] p-20 text-center space-y-6">
                            <div className="w-20 h-20 rounded-[1.5rem] bg-black/5 dark:bg-white/5 flex items-center justify-center mx-auto">
                                <CheckCircle2 className="w-10 h-10 opacity-20" />
                            </div>
                            <p className="text-2xl font-black opacity-30 tracking-tight">কোনো প্রশ্ন পাওয়া যায়নি।</p>
                        </Card>
                    ) : (
                        questions?.map((item: any, i: number) => (
                            <Card key={i} className="group border border-black/5 dark:border-white/5 bg-white/80 dark:bg-black/80 backdrop-blur-3xl rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:shadow-black/5 dark:hover:shadow-white/5">
                                <CardContent className="p-10 md:p-14 space-y-10">
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-black/5 dark:border-white/5">
                                        <div className="flex flex-wrap gap-6 text-sm font-bold">
                                            <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-black/5 dark:bg-white/5 transition-colors group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black">
                                                <User className="w-4 h-4" />
                                                {item.userName || "অজানা ব্যবহারকারী"}
                                            </div>
                                            <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-black/5 dark:bg-white/5 opacity-60">
                                                <Mail className="w-4 h-4" />
                                                {item.userEmail || "ইমেইল দেয়া হয়নি"}
                                            </div>
                                            <div className="flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-black/5 dark:bg-white/5 opacity-40">
                                                <Clock className="w-4 h-4" />
                                                {item.createdAt ? new Date(item.createdAt).toLocaleDateString('bn-BD') : "তারিখ অজানা"}
                                            </div>
                                        </div>

                                        <Badge variant="secondary" className="px-6 py-2.5 rounded-full bg-black dark:bg-white text-white dark:text-black border-none font-black text-[10px] uppercase tracking-[0.2em] shadow-sm animate-pulse">
                                            Pending Action
                                        </Badge>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="flex items-center gap-3 opacity-30">
                                            <HelpCircle className="w-5 h-5 flex-none" />
                                            <p className="text-[10px] font-black uppercase tracking-[0.3em]">ব্যবহারকারীর প্রশ্ন</p>
                                        </div>
                                        <p className="text-2xl md:text-3xl font-black leading-snug tracking-tighter text-foreground group-hover:opacity-100 transition-opacity">
                                            {item.question}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
