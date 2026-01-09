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
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 text-primary mb-8 animate-in zoom-in duration-500">
                    <Send className="w-10 h-10" />
                </div>
                <h1 className="text-4xl font-black mb-4 tracking-tight">আপনার প্রশ্নটি গ্রহণ করা হয়েছে!</h1>
                <p className="text-muted-foreground text-lg mb-10 leading-relaxed font-medium">
                    আমাদের আলেমগণ আপনার প্রশ্নটি গুরুত্বের সাথে পর্যালোচনা করবেন। খুব শীঘ্রই আপনাকে সঠিক ও প্রামাণ্য উত্তর প্রদান করা হবে ইনশাআল্লাহ।
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button size="xl" onClick={() => router.push("/")} className="rounded-2xl font-bold w-full sm:w-auto">
                        হোমে ফিরে যান
                    </Button>
                    <Button variant="outline" size="xl" onClick={() => setIsSuccess(false)} className="rounded-2xl font-bold glass w-full sm:w-auto">
                        আরেকটি প্রশ্ন করুন
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container max-w-3xl mx-auto py-16 px-4">
            <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-sm font-bold mb-4">
                        <Sparkles className="h-4 w-4" />
                        নির্ভরযোগ্য ইসলামিক সমাধান
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                        আপনার <span className="text-gradient">জিজ্ঞাসা</span> আমাদের জানান
                    </h1>
                    <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-2xl mx-auto">
                        আপনার দ্বীনি ও মাসায়েল সংক্রান্ত যেকোনো প্রশ্ন এখানে টাইপ করুন। আমরা কোরআন ও সুন্নাহর আলোকে সঠিক উত্তর নিশ্চিত করি।
                    </p>
                </div>

                <Card className="border border-primary/5 glass-card shadow-2xl overflow-hidden p-6 md:p-10">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <FormField
                                control={form.control}
                                name="question"
                                render={({ field }) => (
                                    <FormItem className="space-y-4">
                                        <FormLabel className="text-lg font-bold flex items-center gap-2">
                                            <HelpCircle className="w-5 h-5 text-primary" />
                                            আপনার প্রশ্ন লিখুন
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="আপনার প্রশ্নটি বিস্তারিত এখানে লিখুন..."
                                                className="min-h-[250px] text-lg bg-background/50 focus:bg-background transition-all duration-300 rounded-2xl p-6 leading-relaxed resize-none border-primary/10"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription className="font-medium text-muted-foreground/60">
                                            আপনার প্রশ্নটি ব্যক্তিগত রাখতে চাইলে দয়া করে আপনার নাম বা ঠিকানা উল্লেখ করবেন না।
                                        </FormDescription>
                                        <FormMessage className="font-bold pt-2" />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" size="xl" disabled={isSubmitting} className="w-full rounded-2xl h-16 text-xl font-black shadow-xl hover:shadow-primary/20 transition-all hover:-translate-y-1 active:scale-95 group">
                                {isSubmitting ? (
                                    <div className="flex items-center gap-3">
                                        <span className="animate-spin h-5 w-5 border-2 border-white/30 border-t-white rounded-full" />
                                        প্রেরণ করা হচ্ছে...
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3">
                                        প্রশ্ন সাবমিট করুন
                                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </div>
                                )}
                            </Button>
                        </form>
                    </Form>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-80">
                    <div className="p-6 rounded-2xl glass border border-primary/5 flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-none">
                            <Sparkles className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-bold mb-1">প্রামাণ্য উত্তর</h4>
                            <p className="text-sm text-muted-foreground font-medium">প্রতিটি প্রশ্নের উত্তর কোরআন ও হাদিসের সঠিক প্রমাণের সাথে প্রদান করা হয়।</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-2xl glass border border-primary/5 flex gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-none">
                            <ArrowRight className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-bold mb-1">গোপনীয়তা</h4>
                            <p className="text-sm text-muted-foreground font-medium">আপনার গোপনীয়তা আমাদের কাছে অত্যন্ত গুরুত্বপূর্ণ। কোনো তথ্য প্রকাশ করা হয় না।</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
