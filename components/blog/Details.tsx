"use client";

import { notFound } from "next/navigation";
import { UserIcon, CalendarIcon, Trash2 } from "lucide-react";
import { useGetBlogById, useDeleteBlog } from "@/apis/blogs";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export const Details = ({ uid }: { uid: string }) => {
  const { user, loading, isAdmin } = useAuth();
  const { data, isLoading, isError } = useGetBlogById(uid);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const { mutateAsync: deleteBlogMutation } = useDeleteBlog();

  if (isLoading || loading) {
    return (
      <div className="container mx-auto py-10 flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
      </div>
    );
  }

  if (isError || !data?.data) {
    notFound(); // if no blog found
  }

  const blog = data.data;

  const handleDelete = async () => {
    if (!isAdmin) return;
    setIsDeleting(true);
    try {
      const token = await user?.getIdToken();
      await deleteBlogMutation({ id: uid, token });
      router.push("/"); // Redirect to blog list
    } catch (error) {
      console.error("Failed to delete blog:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-bold">{blog.title}</h1>
        {isAdmin && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm">
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the blog post "{blog.title}".
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      {blog.category && (
        <p className="text-sm text-gray-500 mb-2">Category: {blog.category}</p>
      )}
      {/* {blog.date && (
        <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
          <CalendarIcon className="w-4 h-4" /> <span>{blog.date}</span>
        </div>
      )} */}
      {blog.author && (
        <div className="flex items-center gap-2 text-gray-500 mb-4">
          <UserIcon className="w-4 h-4" /> <span>{blog.author}</span>
        </div>
      )}
      {blog.content && (
        <div
          className="blog-content max-w-full"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      )}
    </div>
  );
};
