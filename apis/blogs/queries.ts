import { useMutation, useQuery } from "@tanstack/react-query";
import { createBlog, deleteBlog, getBlogById, getBlogs, updateBlog } from "./apis";
import { toast } from "react-toastify";


export type BlogType = {
  uid: string;
  title: string;
  content: string;
  description: string;
  date: string;          // ISO date string
  categories: string[];
  createdAt?: number;    // timestamp, optional
};

// Create Blog
export const useCreateBlog = () => {
  return useMutation({
    mutationFn: ({ values, token }: { values: any; token?: string }) => createBlog({ values, token }),
    onSuccess: () => toast.success("Blog created successfully!"),
    onError: (error: any) =>
      toast.error(error?.response?.data?.message || "Failed to create blog"),
  })
}

// Get Blogs
// React Query hook
export const useGetBlogs = () => {
  return useQuery<BlogType[], Error>({
    queryKey: ["blogs"],
    queryFn: getBlogs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};

// Get Blog by ID
export const useGetBlogById = (id: string) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
    enabled: !!id,
  });
};

// Update Blog
export const useUpdateBlog = () => {
  return useMutation({
    mutationFn: updateBlog,
    onSuccess: () => toast.success("Blog updated successfully!"),
    onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to update blog"),
  });
};

// Delete Blog
export const useDeleteBlog = () => {
  return useMutation({
    mutationFn: ({ id, token }: { id: string; token?: string }) => deleteBlog({ id, token }),
    onSuccess: () => toast.success("Blog deleted successfully!"),
    onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to delete blog"),
  });
};
