"use client"

import { Button } from "@/components/ui/button"
import { auth, googleProvider } from "@/lib/firebase"
import { signInWithPopup } from "firebase/auth"
import { LogIn } from "lucide-react"

export function LoginButton() {
    const handleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.error("Error signing in with Google", error)
        }
    }

    return (
        <Button variant="outline" onClick={handleSignIn} className="flex items-center gap-2">
            <LogIn className="h-4 w-4" />
            লগইন
        </Button>
    )
}
