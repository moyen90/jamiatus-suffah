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
    return <p className="text-center col-span-full">No blogs found.</p>;
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
