
import { Details } from "@/components/blog/Details"


interface BlogPostPageProps {
  params: Promise<{ uid: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { uid } = await params

  return (
    <div>
      <Details uid={uid} />
    </div>
  )
}
