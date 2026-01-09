"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { onAuthStateChanged, User } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { createUser, UserType } from '@/apis/users'

interface AuthContextType {
    user: User | null
    loading: boolean
    isAdmin: boolean
    dbUser: UserType | null
}

const ADMIN_EMAILS = ["dev.moyenislam@gmail.com", "muftyrabiulislam@gmail.com"]

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    isAdmin: false,
    dbUser: null,
})

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null)
    const [dbUser, setDbUser] = useState<UserType | null>(null)
    const [loading, setLoading] = useState(true)

    const syncUser = async (firebaseUser: User) => {
        try {
            const response: any = await createUser({
                uid: firebaseUser.uid,
                name: firebaseUser.displayName || "",
                email: firebaseUser.email || "",
                photoURL: firebaseUser.photoURL || "",
                emailVerified: firebaseUser.emailVerified,
            });
            console.log("User synchronized with backend");
            if (response?.data) {
                setDbUser(response.data)
            }
        } catch (error) {
            // If user already exists, it might throw an error (e.g. 400 or 409)
            // We ignore it for now as the goal is to ensure the user exists.
            console.warn("User sync already done or failed", error);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user)
            if (user) {
                syncUser(user);
            }
            setLoading(false)
        })

        return () => unsubscribe()
    }, [])

    const isAdmin = !!user && !!user.email && ADMIN_EMAILS.includes(user.email)

    return (
        <AuthContext.Provider value={{ user, loading, isAdmin, dbUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
