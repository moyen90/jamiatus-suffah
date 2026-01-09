import { BlogsHomeCard } from "@/components/blog/BlogsHomeCard";
import { Header } from "@/components/homePage/Header";
import { getBlogs } from "@/apis/blogs/apis";
import { BlogType } from "@/apis/blogs/queries";


const HomePage = async () => {
  let blogs: BlogType[] = [];
  try {
    blogs = await getBlogs();
  } catch (error) {
    console.error("Failed to fetch blogs on server:", error);
  }

  return (
    <div className="">
      <Header />
      <BlogsHomeCard blogs={blogs} />
    </div>
  );
}
export default HomePage;