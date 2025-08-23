"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CalendarDays } from "lucide-react";

interface BlogPost {
  uid: string;
  title: string;
  description: string;
  date: string;
}

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC", // deterministic for SSR + client
  }).format(new Date(post.date));

  return (
    <div>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
        <Link href={`/blog/${post.uid}`}>
          <CardHeader>
            <CardTitle className="line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </CardTitle>
            <CardDescription className="line-clamp-3">
              {post.description}
            </CardDescription>
          </CardHeader>
        </Link>

        <CardContent>
          <div className="flex items-center text-sm text-muted-foreground mb-2">
            <CalendarDays className="w-4 h-4 mr-1" />
            {formattedDate}
          </div>

          <Link href={`/blog/${post.uid}`}>
            <button className="mt-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Read More →
            </button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
