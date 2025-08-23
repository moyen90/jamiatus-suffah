import { useMutation, useQuery } from "@tanstack/react-query";
import { createBlog, deleteBlog, getBlogById, getBlogs, updateBlog } from "./apis";
import { toast } from "react-toastify";

type BlogType = {
  _id: string;
  title: string;
  content: string;
  category?: string;
  author: {
    _id: string;
    name: string;
    email?: string;
  };
  createdAt: string;
  updatedAt: string;
};

type GetBlogsParams = {
  search?: string;
  category?: string;
};

// Create Blog
export const useCreateBlog = () => {
  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => toast.success("Blog created successfully!"),
    onError: (error: any) =>
      toast.error(error?.response?.data?.message || "Failed to create blog"),
  })
}

// Get Blogs
export const useGetBlogs = ({ search = "", category = "" }: GetBlogsParams = {}) => {
  return useQuery<BlogType[], Error>({
    queryKey: ["blogs", search, category],
    queryFn: () => getBlogs({ search, category }),
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
    mutationFn: deleteBlog,
    onSuccess: () => toast.success("Blog deleted successfully!"),
    onError: (error: any) => toast.error(error?.response?.data?.message || "Failed to delete blog"),
  });
};
