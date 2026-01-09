import { Details } from "@/components/blog/Details"
import { getBlogById } from "@/apis/blogs/apis"

interface BlogPostPageProps {
  params: Promise<{ uid: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { uid } = await params

  let blog = null;
  try {
    blog = await getBlogById(uid);
  } catch (error) {
    console.error("Failed to fetch blog on server:", error);
  }

  return (
    <div>
      <Details uid={uid} blog={blog} />
    </div>
  )
}
