"use client"

import * as React from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LogIn, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { auth, googleProvider } from "@/lib/firebase"
import { signInWithPopup } from "firebase/auth"
import { useAuth } from "@/providers/AuthProvider"

function LoginContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const callbackUrl = searchParams.get("callbackUrl") || "/"
    const { user, loading } = useAuth()
    const [isSigningIn, setIsSigningIn] = React.useState(false)

    React.useEffect(() => {
        if (!loading && user) {
            router.push(callbackUrl)
        }
    }, [user, loading, router, callbackUrl])

    const handleGoogleSignIn = async () => {
        try {
            setIsSigningIn(true)
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.error("Error signing in with Google:", error)
        } finally {
            setIsSigningIn(false)
        }
    }

    if (loading) return null

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-muted/50 to-background p-4">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px]" />
            </div>

            <Card className="w-full max-w-md border-none shadow-2xl bg-background/80 backdrop-blur-xl z-10 relative">
                <CardHeader className="space-y-4 text-center">
                    <div className="mx-auto w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center transform rotate-12 transition-transform hover:rotate-0">
                        <Sparkles className="w-8 h-8 text-primary" />
                    </div>
                    <div className="space-y-2">
                        <CardTitle className="text-3xl font-bold tracking-tight">স্বাগতম</CardTitle>
                        <CardDescription className="text-muted-foreground text-lg">
                            সুফ্ফাহ সেন্টারে আপনার একাউন্টে লগইন করুন
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6 pt-6">
                    <Button
                        variant="outline"
                        className="w-full h-14 text-lg font-medium border-2 hover:bg-muted/50 transition-all active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden group"
                        onClick={handleGoogleSignIn}
                        disabled={isSigningIn}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        {isSigningIn ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" />
                        ) : (
                            <>
                                <svg className="w-6 h-6" viewBox="0 0 48 48">
                                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
                                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.13-.45-4.69H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.51z" />
                                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                                    <path fill="none" d="M0 0h48v48H0z" />
                                </svg>
                                Google দিয়ে কন্টিনিউ করুন
                            </>
                        )}
                    </Button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-muted-foreground/20" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-4 text-muted-foreground/60">নিরাপদ লগইন</span>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col space-y-4 pb-8">
                    <p className="text-sm text-center text-muted-foreground px-8 leading-relaxed">
                        লগইন করার মাধ্যমে আপনি আমাদের শর্তাবলী এবং গোপনীয়তা নীতির সাথে একমত পোষণ করছেন।
                    </p>
                </CardFooter>
            </Card>
        </div>
    )
}

export default function LoginPage() {
    return (
        <React.Suspense fallback={null}>
            <LoginContent />
        </React.Suspense>
    )
}
