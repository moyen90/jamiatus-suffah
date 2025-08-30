"use client";

import { useGetBlogs } from "@/apis/blogs";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogCard } from "./BlogCard";

export const BlogsHomeCard = () => {
  const { data: blogs, isLoading } = useGetBlogs();

  console.log(blogs);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-48 w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="w-full text-center py-20">
        <h1 className="text-2xl font-bold text-black dark:text-white">কোন মাসালা-মাসায়েল পাওয়া যায়নি।</h1>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 mx-auto max-w-7xl py-10">
      {blogs.map((blog) => (
        <BlogCard
          key={blog.uid}
          post={{
            uid: blog.uid,
            title: blog.title,
            description: blog.description,
            date: blog.date
          }}
        />
      ))}
    </div>
  );
};
