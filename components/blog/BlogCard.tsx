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
  title: string
}

interface BlogCardProps {
  post: BlogPost;
}

export const BlogCard: React.FC<BlogCardProps> = ({ post }) => {

  return (
    <div>
      <Card className="h-full hover:shadow-lg transition-shadow duration-300 cursor-pointer group">
        <Link href={`/blog/${post.uid}`}>
          <CardHeader>
            <CardTitle className="line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {post.title}
            </CardTitle>
          </CardHeader>
        </Link>

        <CardContent>

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
