
import { apiClient } from "@/utils/apiCLient";
import { BLOG } from "./endpoints";

// Create a blog
export const createBlog = async (values: any) => {
  try {
    const response = await apiClient.post(BLOG, values);
    return response.data;
  } catch (error) {
    console.error("Error creating blog", error);
    throw error;
  }
};

// Get all blogs (optional params for filtering)
type GetBlogsParams = {
  search?: string;
  category?: string;
};

export const getBlogs = async ({ search, category }: GetBlogsParams = {}): Promise<any> => {
  const params: any = {};
  if (search) params.search = search;
  if (category) params.category = category;

  const response = await apiClient.get(BLOG, { params });
  return response.data;
};

// Get blog by ID
export const getBlogById = async (id: string) => {
  try {
    const response = await apiClient.get(`${BLOG}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching blog by id", error);
    throw error;
  }
};

// Update blog
export const updateBlog = async ({ id, data }: { id: string; data: any }) => {
  try {
    const response = await apiClient.put(`${BLOG}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating blog", error);
    throw error;
  }
};

// Delete blog
export const deleteBlog = async (id: string) => {
  try {
    const response = await apiClient.delete(`${BLOG}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting blog", error);
    throw error;
  }
};
