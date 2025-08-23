"use client";

import { notFound } from "next/navigation";
import { UserIcon, CalendarIcon } from "lucide-react";
import { useGetBlogById } from "@/apis/blogs";

export const Details = ({ uid }: { uid: string }) => {
  const { data, isLoading, isError } = useGetBlogById(uid);

  if (isLoading) {
    return <div>Loading blog...</div>;
  }

  if (isError || !data?.data) {
    notFound(); // if no blog found
  }

  const blog = data.data;
  console.log(blog)

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      {blog.category && (
        <p className="text-sm text-gray-500 mb-2">Category: {blog.category}</p>
      )}
      {blog.date && (
        <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
          <CalendarIcon className="w-4 h-4" /> <span>{blog.date}</span>
        </div>
      )}
      {blog.author && (
        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <UserIcon className="w-4 h-4" /> <span>{blog.author}</span>
        </div>
      )}
      {blog.content && (
        <div
          className="prose max-w-full"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      )}
    </div>
  );
};
