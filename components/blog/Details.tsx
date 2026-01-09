"use client";

import { useRouter } from "next/navigation";
import {
  UserIcon,
  CalendarIcon,
  Trash2,
  Quote,
  CheckCircle,
  ArrowLeft,
  Share2,
  Clock,
  Copy,
  Check,
  Edit
} from "lucide-react";
import { toast } from "sonner";
import { useGetBlogById, useDeleteBlog } from "@/apis/blogs";
import { useState, useEffect } from "react";
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
import { Badge } from "@/components/ui/badge";
import { BlogType } from "@/apis/blogs/queries";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { useAuth } from "@/providers/AuthProvider";
import { useBlogs } from "@/providers/BlogProvider";

export const Details = ({ blog: initialBlog, uid }: { blog?: BlogType | null, uid: string }) => {
  const { user, loading: authLoading, isAdmin } = useAuth();
  const { getBlogByUid } = useBlogs();

  // Try to get from context first, then fallback to initialBlog from SSR
  const blogFromContext = getBlogByUid(uid);
  const [blog, setBlog] = useState<BlogType | null>(blogFromContext || initialBlog || null);

  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const { mutateAsync: deleteBlogMutation } = useDeleteBlog();

  // Also fetch if we don't have it (fallback for direct links)
  const { data: fetchedBlog, isLoading: isFetching } = useGetBlogById(uid, {
    enabled: !blog
  });

  // Sync state if fetched
  useEffect(() => {
    if (fetchedBlog) {
      setBlog(fetchedBlog);
    }
  }, [fetchedBlog]);

  useEffect(() => {
    if (blogFromContext) {
      setBlog(blogFromContext);
    }
  }, [blogFromContext]);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("লিংক কপি করা হয়েছে!", {
      description: "এখন আপনি এটি যেকোনো জায়গায় শেয়ার করতে পারেন।",
      icon: <Check className="w-4 h-4" />,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  if (!blog) {
    if (isFetching) {
      return (
        <div className="container mx-auto py-20 flex flex-col items-center justify-center min-h-[600px] space-y-4">
          <div className="relative w-24 h-24">
            <div className="absolute inset-0 rounded-full border-4 border-black/5 dark:border-white/5"></div>
            <div className="absolute inset-0 rounded-full border-4 border-t-black dark:border-t-white animate-spin"></div>
          </div>
          <p className="text-black dark:text-white font-black text-sm uppercase tracking-[0.3em] animate-pulse">সংগ্রহ করা হচ্ছে...</p>
        </div>
      );
    }

    return (
      <div className="container mx-auto py-20 flex flex-col items-center justify-center min-h-[600px] space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter">মাসায়েলটি পাওয়া যায়নি</h2>
          <p className="text-muted-foreground text-xl font-medium">দুঃখিত, আপনি যে মাসায়েলটি খুঁজছেন সেটি খুঁজে পাওয়া যায়নি অথবা মুছে ফেলা হয়েছে।</p>
        </div>
        <Button
          onClick={() => router.push("/")}
          className="rounded-full px-12 h-14 text-lg font-black bg-black dark:bg-white text-white dark:text-black hover:scale-105 transition-transform"
        >
          হোম পেজে ফিরে যান
        </Button>
      </div>
    );
  }

  const handleDelete = async () => {
    if (!isAdmin) return;
    setIsDeleting(true);
    try {
      const token = await user?.getIdToken();
      await deleteBlogMutation({ id: uid, token });
      router.push("/");
    } catch (error) {
      console.error("Failed to delete blog:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-white dark:bg-black pb-32 overflow-hidden selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black text-black dark:text-white">
      {/* Monochrome Mesh Gradient Background Accents */}
      <div className="absolute top-[-10%] right-[-10%] w-[100vw] h-[100vw] bg-black/[0.02] dark:bg-white/[0.02] rounded-full blur-[180px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-black/[0.02] dark:bg-white/[0.02] rounded-full blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 pt-12">
        {/* Navigation & Actions */}
        <div className="flex items-center justify-between mb-12">
          <Button variant="ghost" onClick={() => router.back()} className="rounded-full gap-2 group transition-all">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            ফিরে যান
          </Button>

          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full shadow-sm border-black/10 dark:border-white/10 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
              <Share2 className="w-5 h-5" />
            </Button>
            {!authLoading && isAdmin && (
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/blog/${uid}/edit`)}
                  className="rounded-full px-8 h-11 font-bold bg-black dark:bg-white text-white dark:text-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white border border-transparent hover:border-black dark:hover:border-white shadow-2xl active:scale-95 transition-all duration-300"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  আপডেট
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="rounded-full px-8 h-11 font-bold bg-red-600 text-white hover:bg-red-700 border border-transparent shadow-2xl active:scale-95 transition-all duration-300">
                      <Trash2 className="w-4 h-4 mr-2" />
                      ডিলিট
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_40px_100px_-15px_rgba(255,255,255,0.05)] backdrop-blur-3xl bg-white/90 dark:bg-black/90">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-3xl font-black tracking-tight">আপনি কি নিশ্চিত?</AlertDialogTitle>
                      <AlertDialogDescription className="text-xl font-medium text-foreground/60">
                        এই আর্টিকেলটি "{blog?.title}" স্থায়ীভাবে মুছে ফেলা হবে। এটি আর ফিরে পাওয়া সম্ভব না।
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="gap-3 mt-6">
                      <AlertDialogCancel className="rounded-full px-8 h-12 font-bold border-black/10 dark:border-white/10">বাতিল করুন</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-black dark:bg-white text-white dark:text-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white border border-transparent hover:border-black dark:hover:border-white rounded-full px-10 h-12 font-black transition-all duration-300"
                      >
                        {isDeleting ? "মুছে ফেলা হচ্ছে..." : "মুছে ফেলুন"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        </div>

        {/* Article Header */}
        <header className="mb-24 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            {blog?.categories?.map((cat: string, i: number) => (
              <Badge key={i} variant="secondary" className="px-6 py-2 rounded-full bg-black/5 dark:bg-white/5 text-black dark:text-white border-none font-black text-xs uppercase tracking-[0.2em] shadow-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                {cat}
              </Badge>
            ))}
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1] mb-12">
            {blog?.title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-muted-foreground font-bold uppercase tracking-widest text-[10px]">
            <div className="flex items-center gap-3">
              <CalendarIcon className="w-4 h-4" />
              <span>৯ জানুয়ারি, ২০২৬</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-4 h-4" />
              <span>৮ মিনিট পাঠ</span>
            </div>
            <div className="flex items-center gap-3">
              <UserIcon className="w-4 h-4" />
              <span>{blog?.author || "আলেম পরিষদ"}</span>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto">
          <main>
            <Card className="border border-black/5 dark:border-white/5 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_40px_100px_-15px_rgba(255,255,255,0.02)] bg-white/50 dark:bg-black/50 backdrop-blur-3xl rounded-[3rem] overflow-hidden">
              <CardContent className="p-12 md:p-20">
                {/* Summary/Description Callout */}
                {blog.description && (
                  <div className="mb-16 relative p-12 rounded-[2.5rem] bg-black/[0.02] dark:bg-white/[0.02] border-l-[8px] border-black dark:border-white italic text-2xl md:text-3xl text-foreground font-black leading-tight tracking-tight group">
                    <Quote className="absolute -top-6 -left-6 w-16 h-16 text-black/5 dark:text-white/5 transition-opacity" />
                    {blog.description}
                  </div>
                )}

                <div
                  className="blog-content text-xl md:text-2xl leading-[1.6] text-foreground/90 space-y-10 
                                       [&>p]:leading-relaxed [&>p]:mb-12
                                       [&>h1]:text-5xl [&>h1]:font-black [&>h1]:mb-10 [&>h1]:mt-20 [&>h1]:tracking-tighter
                                       [&>h2]:text-4xl [&>h2]:font-black [&>h2]:mb-8 [&>h2]:mt-16 [&>h2]:tracking-tight [&>h2]:border-b-4 [&>h2]:border-black dark:[&>h2]:border-white [&>h2]:pb-2 [&>h2]:inline-block
                                       [&>h3]:text-3xl [&>h3]:font-bold [&>h3]:mb-6 [&>h3]:mt-12
                                       [&>ul]:list-disc [&>ul]:pl-10 [&>ul]:mb-10 [&>ul]:space-y-6
                                       [&>ol]:list-decimal [&>ol]:pl-10 [&>ol]:mb-10 [&>ol]:space-y-6
                                       [&>blockquote]:border-l-[10px] [&>blockquote]:border-black dark:[&>blockquote]:border-white [&>blockquote]:pl-10 [&>blockquote]:py-8 [&>blockquote]:bg-black/5 dark:[&>blockquote]:bg-white/5 [&>blockquote]:text-3xl [&>blockquote]:font-black [&>blockquote]:tracking-tight [&>blockquote]:my-16
                                       [&>img]:rounded-[3rem] [&>img]:shadow-2xl [&>img]:my-20 [&>img]:mx-auto [&>img]:grayscale hover:[&>img]:grayscale-0 transition-all duration-1000
                                       [&>hr]:border-black/10 dark:[&>hr]:border-white/10 [&>hr]:my-16 [&>hr]:w-1/3 [&>hr]:mx-auto [&>hr]:border-t-4"
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />
              </CardContent>
            </Card>
          </main>
        </div>
      </div>
    </div>
  );
};
