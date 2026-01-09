"use client";

import { notFound } from "next/navigation";
import {
  UserIcon,
  CalendarIcon,
  Trash2,
  MapPin,
  Mail,
  Quote,
  CheckCircle,
  ArrowLeft,
  Share2,
  Clock,
  Copy,
  Check
} from "lucide-react";
import { toast } from "sonner";
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
import { Badge } from "@/components/ui/badge";
import { BlogType } from "@/apis/blogs/queries";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const Details = ({ blog, uid }: { blog: BlogType, uid: string }) => {
  const { user, loading, isAdmin } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  const { mutateAsync: deleteBlogMutation } = useDeleteBlog();

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast.success("লিংক কপি করা হয়েছে!", {
      description: "এখন আপনি এটি যেকোনো জায়গায় শেয়ার করতে পারেন।",
      icon: <Check className="w-4 h-4" />,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="container mx-auto py-20 flex flex-col items-center justify-center min-h-[600px] space-y-4">
        <div className="relative w-24 h-24">
          <div className="absolute inset-x-0 inset-y-0 rounded-full border-4 border-black/5 dark:border-white/5"></div>
          <div className="absolute inset-x-0 inset-y-0 rounded-full border-4 border-t-black dark:border-t-white animate-spin"></div>
        </div>
        <p className="text-black dark:text-white font-black text-sm uppercase tracking-[0.3em] animate-pulse">সংগ্রহ করা হচ্ছে...</p>
      </div>
    );
  }

  if (!blog) {
    notFound();
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

  const ActorCard = ({ title, data, icon: Icon }: { title: string, data: any, icon: any }) => {
    if (!data) return null;
    return (
      <Card className="overflow-hidden border border-black/5 dark:border-white/5 shadow-2xl bg-white/80 dark:bg-black/80 backdrop-blur-2xl transition-all duration-500 hover:shadow-black/5 dark:hover:shadow-white/5 hover:-translate-y-1 group">
        <div className="h-1 w-full bg-black dark:bg-white opacity-20 group-hover:opacity-100 transition-opacity" />
        <CardContent className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-black dark:bg-white text-white dark:text-black shadow-xl">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="font-black text-xl tracking-tight">{title}</h3>
          </div>
          <div className="space-y-5">
            <div className="flex items-start gap-4 group/item">
              <div className="mt-1 p-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-black dark:text-white group-hover/item:bg-black group-hover/item:text-white dark:group-hover/item:bg-white dark:group-hover/item:text-black transition-all">
                <UserIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mb-1">নাম</p>
                <p className="font-bold text-base">{data.name}</p>
              </div>
            </div>
            {data.address && (
              <div className="flex items-start gap-4 group/item">
                <div className="mt-1 p-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-black dark:text-white group-hover/item:bg-black group-hover/item:text-white dark:group-hover/item:bg-white dark:group-hover/item:text-black transition-all">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mb-1">ঠিকানা</p>
                  <p className="font-medium text-sm leading-relaxed text-foreground/80">{data.address}</p>
                </div>
              </div>
            )}
            {data.email && (
              <div className="flex items-start gap-4 group/item text-wrap break-all">
                <div className="mt-1 p-1.5 rounded-lg bg-black/5 dark:bg-white/5 text-black dark:text-white group-hover/item:bg-black group-hover/item:text-white dark:group-hover/item:bg-white dark:group-hover/item:text-black transition-all">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.2em] mb-1">ইমেইল</p>
                  <p className="font-medium text-sm text-foreground/70">{data.email}</p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
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
            {isAdmin && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="rounded-full px-8 h-11 font-bold bg-black dark:bg-white text-white dark:text-black hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white border border-transparent hover:border-black dark:hover:border-white shadow-2xl active:scale-95 transition-all duration-300">
                    <Trash2 className="w-4 h-4 mr-2" />
                    ডিলিট
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="rounded-[2.5rem] border border-black/5 dark:border-white/5 shadow-[0_40px_100px_-15px_rgba(0,0,0,0.2)] dark:shadow-[0_40px_100px_-15px_rgba(255,255,255,0.05)] backdrop-blur-3xl bg-white/90 dark:bg-black/90">
                  <AlertDialogHeader>
                    <AlertDialogTitle className="text-3xl font-black tracking-tight">আপনি কি নিশ্চিত?</AlertDialogTitle>
                    <AlertDialogDescription className="text-xl font-medium text-foreground/60">
                      এই আর্টিকেলটি "{blog.title}" স্থায়ীভাবে মুছে ফেলা হবে। এটি আর ফিরে পাওয়া সম্ভব না।
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
            )}
          </div>
        </div>

        {/* Article Header */}
        <header className="mb-24 text-center max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-4 mb-8">
            {blog.categories?.map((cat: string, i: number) => (
              <Badge key={i} variant="secondary" className="px-6 py-2 rounded-full bg-black/5 dark:bg-white/5 text-black dark:text-white border-none font-black text-xs uppercase tracking-[0.2em] shadow-sm hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all">
                {cat}
              </Badge>
            ))}
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[1] mb-12">
            {blog.title}
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
              <span>{blog.author || "আলেম পরিষদ"}</span>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          <main className="lg:col-span-8">
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

          {/* Sidebar Data */}
          {/* Sidebar Data */}
          <aside className="lg:col-span-4 space-y-12 lg:sticky lg:top-16">
            <ActorCard
              title="প্রশ্নকারী"
              data={blog.asked_by}
              icon={Quote}
            />

            <ActorCard
              title="উত্তর প্রদানকারী"
              data={blog.answered_by}
              icon={CheckCircle}
            />

            {/* Engagement / Extra Info */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-black dark:bg-white rounded-[3rem] blur-2xl opacity-5 group-hover:opacity-10 transition duration-1000" />
              <Card className="relative border border-black/5 dark:border-white/5 bg-white/90 dark:bg-black/90 backdrop-blur-3xl rounded-[3rem] overflow-hidden shadow-2xl">
                <CardContent className="p-10 space-y-10">
                  <div className="flex items-center gap-5">
                    <div className="w-14 h-14 rounded-2xl bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-2xl transition-transform group-hover:scale-110">
                      <Share2 className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="font-black text-2xl tracking-tighter">শেয়ার করুন</h4>
                      <p className="text-[10px] text-muted-foreground font-black uppercase tracking-[0.3em]">উপকার ছড়ান</p>
                    </div>
                  </div>

                  <p className="text-base text-muted-foreground/80 leading-relaxed font-bold">
                    এই গুরুত্বপূর্ণ হুকুমটি আপনার আপনজনদের সাথে শেয়ার করে দ্বীন প্রচারে সওয়াবের অংশীদার হোন।
                  </p>

                  <Button
                    variant={copied ? "default" : "secondary"}
                    className={`w-full h-16 rounded-[1.5rem] gap-4 font-black text-sm uppercase tracking-[0.1em] shadow-2xl active:scale-95 transition-all duration-500 ${copied
                      ? "bg-black dark:bg-white text-white dark:text-black shadow-black/20 dark:shadow-white/20 border-none"
                      : "bg-black/5 dark:bg-white/5 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black border-black/5 dark:border-white/5"
                      }`}
                    onClick={handleCopy}
                    disabled={copied}
                  >
                    {copied ? (
                      <>
                        <Check className="w-6 h-6 animate-in zoom-in duration-500" />
                        লিংক কপি করা হয়েছে
                      </>
                    ) : (
                      <>
                        <Copy className="w-6 h-6" />
                        লিংক কপি করুন
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div >
      </div >
    </div >
  );
};
