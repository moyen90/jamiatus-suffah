"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { BlogType } from '@/apis/blogs/queries'

interface BlogContextType {
    blogs: BlogType[]
    setBlogs: (blogs: BlogType[]) => void
    getBlogByUid: (uid: string) => BlogType | undefined
}

const BlogContext = createContext<BlogContextType>({
    blogs: [],
    setBlogs: () => { },
    getBlogByUid: () => undefined,
})

export const BlogProvider = ({ children }: { children: React.ReactNode }) => {
    const [blogs, setBlogsState] = useState<BlogType[]>([])

    const setBlogs = (newBlogs: BlogType[]) => {
        setBlogsState(newBlogs)
    }

    const getBlogByUid = (uid: string) => {
        return blogs.find(blog => blog.uid === uid)
    }

    return (
        <BlogContext.Provider value={{ blogs, setBlogs, getBlogByUid }}>
            {children}
        </BlogContext.Provider>
    )
}

export const useBlogs = () => useContext(BlogContext)
