"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/providers/AuthProvider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { HelpCircle, Send, Sparkles, ArrowRight } from "lucide-react"
import { useCreateQuestion } from "@/apis/questions"

const formSchema = z.object({
    question: z.string().min(10, {
        message: "আপনার প্রশ্নটি অন্তত ১০ অক্ষরের হতে হবে।",
    }).max(2000, {
        message: "আপনার প্রশ্নটি ২০০০ অক্ষরের বেশি হতে পারবে না।",
    }),
})

export default function AskPage() {
    const router = useRouter()
    const { user, loading } = useAuth()
    const { mutateAsync: createQuestionMutation } = useCreateQuestion()
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            question: "",
        },
    })

    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login?callbackUrl=/ask")
        }
    }, [loading, user, router])

    if (loading || !user) {
        return (
            <div className="container mx-auto py-20 flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
        )
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsSubmitting(true)
        try {
            const token = await user?.getIdToken()
            await createQuestionMutation({
                data: {
                    question: values.question,
                    userUid: user?.uid as string,
                    userName: user?.displayName as string,
                    userEmail: user?.email as string,
                },
                token,
            })
            setIsSuccess(true)
            form.reset()
        } catch (error) {
            console.error("Failed to submit inquiry", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    if (isSuccess) {
        return (
            <div className="container max-w-2xl mx-auto py-32 px-4 text-center">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-[2rem] bg-black dark:bg-white text-white dark:text-black mb-10 animate-in zoom-in duration-500 shadow-2xl">
                    <Send className="w-10 h-10" />
                </div>
                <h1 className="text-5xl font-black mb-6 tracking-tighter">আপনার প্রশ্নটি গ্রহণ করা হয়েছে!</h1>
                <p className="text-muted-foreground/80 text-xl mb-12 leading-relaxed font-bold">
                    আমাদের আলেমগণ আপনার প্রশ্নটি গুরুত্বের সাথে পর্যালোচনা করবেন। খুব শীঘ্রই আপনাকে সঠিক ও প্রামাণ্য উত্তর প্রদান করা হবে ইনশাআল্লাহ।
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button size="xl" onClick={() => router.push("/")} className="rounded-[1.5rem] font-black w-full sm:w-auto bg-black dark:bg-white text-white dark:text-black hover:opacity-90 shadow-2xl transition-all active:scale-95">
                        হোমে ফিরে যান
                    </Button>
                    <Button variant="outline" size="xl" onClick={() => setIsSuccess(false)} className="rounded-[1.5rem] font-black glass w-full sm:w-auto border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-all active:scale-95">
                        আরেকটি প্রশ্ন করুন
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container max-w-4xl mx-auto py-24 px-6 overflow-hidden relative">
            {/* Background Orbs - Monochrome */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60vw] h-[60vw] bg-black/[0.03] dark:bg-white/[0.02] rounded-full blur-[120px] -z-10 pointer-events-none" />

            <div className="space-y-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="text-center space-y-6">
                    <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-black dark:text-white text-xs font-black uppercase tracking-[0.3em] mb-6 shadow-sm">
                        <Sparkles className="h-4 w-4" />
                        Islamic Knowledge Center
                    </div>
                    <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-none">
                        আপনার <span className="opacity-40">জিজ্ঞাসা</span> আমাদের জানান
                    </h1>
                    <p className="text-muted-foreground/80 text-xl font-bold leading-relaxed max-w-3xl mx-auto">
                        আপনার দ্বীনি ও মাসায়েল সংক্রান্ত যেকোনো প্রশ্ন এখানে টাইপ করুন। আমরা কোরআন ও সুন্নাহর আলোকে সঠিক উত্তর নিশ্চিত করি।
                    </p>
                </div>

                <Card className="border border-black/5 dark:border-white/5 bg-white/90 dark:bg-black/90 backdrop-blur-3xl shadow-[0_80px_150px_-30px_rgba(0,0,0,0.1)] dark:shadow-[0_80px_150px_-30px_rgba(255,255,255,0.02)] rounded-[3.5rem] overflow-hidden p-8 md:p-16 relative">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
                            <FormField
                                control={form.control}
                                name="question"
                                render={({ field }) => (
                                    <FormItem className="space-y-6">
                                        <FormLabel className="text-2xl font-black tracking-tight flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-lg">
                                                <HelpCircle className="w-6 h-6" />
                                            </div>
                                            আপনার প্রশ্ন লিখুন
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="আপনার প্রশ্নটি বিস্তারিত এখানে লিখুন..."
                                                className="min-h-[300px] text-2xl bg-black/[0.02] dark:bg-white/[0.02] focus:bg-white dark:focus:bg-black transition-all duration-500 rounded-[2rem] p-10 leading-relaxed resize-none border-black/5 dark:border-white/5 shadow-inner font-bold"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className="font-bold text-muted-foreground/40 text-sm uppercase tracking-[0.1em]">
                                            আপনার প্রশ্নটি ব্যক্তিগত রাখতে চাইলে দয়া করে আপনার নাম বা ঠিকানা উল্লেখ করবেন না।
                                        </FormDescription>
                                        <FormMessage className="font-black text-red-500 pt-3" />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" size="xl" disabled={isSubmitting} className="w-full rounded-[2rem] h-20 text-2xl font-black shadow-2xl transition-all duration-500 hover:-translate-y-1 active:scale-[0.98] group bg-black dark:bg-white text-white dark:text-black hover:opacity-100 overflow-hidden relative border border-transparent">
                                {isSubmitting ? (
                                    <div className="flex items-center gap-4">
                                        <span className="animate-spin h-6 w-6 border-4 border-white/20 dark:border-black/20 border-t-white dark:border-t-black rounded-full" />
                                        প্রেরণ করা হচ্ছে...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-4">
                                        প্রশ্ন সাবমিট করুন
                                        <Send className="w-6 h-6 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                                    </div>
                                )}
                                {/* Premium Hover Shine Effect */}
                                <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/10 dark:via-black/5 to-transparent skew-x-[30deg] group-hover:left-[100%] transition-all duration-1000" />
                            </Button>
                        </form>
                    </Form>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 opacity-90">
                    <div className="p-8 rounded-[2.5rem] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/2 backdrop-blur-xl flex gap-6 transition-transform hover:-translate-y-1">
                        <div className="w-14 h-14 rounded-2xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center flex-none shadow-2xl">
                            <Sparkles className="w-7 h-7" />
                        </div>
                        <div>
                            <h4 className="font-black text-xl mb-2 tracking-tight">প্রামাণ্য উত্তর</h4>
                            <p className="text-base text-muted-foreground/80 font-bold leading-relaxed">প্রতিটি প্রশ্নের উত্তর কোরআন ও হাদিসের সঠিক প্রমাণের সাথে প্রদান করা হয়।</p>
                        </div>
                    </div>
                    <div className="p-8 rounded-[2.5rem] bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/2 backdrop-blur-xl flex gap-6 transition-transform hover:-translate-y-1">
                        <div className="w-14 h-14 rounded-2xl bg-black/10 dark:bg-white/10 text-black dark:text-white flex items-center justify-center flex-none border border-black/5 dark:border-white/5">
                            <ArrowRight className="w-7 h-7" />
                        </div>
                        <div>
                            <h4 className="font-black text-xl mb-2 tracking-tight">গোপনীয়তা</h4>
                            <p className="text-base text-muted-foreground/80 font-bold leading-relaxed">আপনার গোপনীয়তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। কোনো তথ্য প্রকাশ করা হয় না।</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
