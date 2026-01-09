
import { apiClient } from "@/utils/apiCLient";
import { BLOG } from "./endpoints";

// Define BlogType or import it from the correct module
type BlogType = {
  uid: string;
  title: string;
  content: string;
  description: string;
  date: string;          // ISO date string
  categories: string[];
  createdAt?: number;    // timestamp, optional
};


// Create a blog
export const createBlog = async ({ values, token }: { values: any; token?: string }) => {
  try {
    const response = await apiClient.post(BLOG, values, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
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

export const getBlogs = async (): Promise<BlogType[]> => {
  const response = await apiClient.get(BLOG);
  return response.data.data;
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
export const deleteBlog = async ({ id, token }: { id: string; token?: string }) => {
  try {
    const response = await apiClient.delete(`${BLOG}/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting blog", error);
    throw error;
  }
};
