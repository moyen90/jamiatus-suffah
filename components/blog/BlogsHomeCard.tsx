import { BlogType } from "@/apis/blogs/queries";
import { Skeleton } from "@/components/ui/skeleton";
import { ModernBlogCard } from "./ModernBlogCard";
import { Sparkles } from "lucide-react";

export const BlogsHomeCard = ({ blogs, isLoading }: { blogs?: BlogType[], isLoading?: boolean }) => {
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[400px] w-full rounded-3xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="w-full text-center py-32">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
          <Sparkles className="w-10 h-10 text-muted-foreground/40" />
        </div>
        <h2 className="text-3xl font-bold text-foreground">কোন মাসালা-মাসায়েল পাওয়া যায়নি।</h2>
        <p className="text-muted-foreground mt-2">নতুন আর্টিকেল শীঘ্রই যোগ করা হবে।</p>
      </div>
    );
  }

  const featuredBlog = blogs[0];
  const otherBlogs = blogs.slice(1);

  return (
    <div className="container mx-auto px-4 pb-32">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-sm">
            <span className="w-8 h-px bg-primary" />
            সর্বশেষ আপডেট
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight italic">
            নতুন <span className="text-gradient">মাসালা-মাসায়েল</span>
          </h2>
        </div>
        <p className="text-muted-foreground max-w-md md:text-right font-medium">
          দ্বীনি বিষয়ে সঠিক ও নির্ভরযোগ্য জ্ঞান অর্জনে আমাদের নিয়মিত প্রকাশিত আর্টিকেলগুলো পড়ুন।
        </p>
      </div>

      <div className="space-y-10 md:space-y-16">
        {/* Featured Blog */}
        {featuredBlog && (
          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 rounded-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            <ModernBlogCard
              uid={featuredBlog.uid}
              title={featuredBlog.title}
              categories={featuredBlog.categories || ["ফিচার্ড"]}
              excerpt={featuredBlog.description}
            />
          </div>
        )}

        {/* Blog Grid */}
        {otherBlogs.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {otherBlogs.map((blog) => (
              <ModernBlogCard
                key={blog.uid}
                uid={blog.uid}
                title={blog.title}
                categories={blog.categories}
                excerpt={blog.description}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
