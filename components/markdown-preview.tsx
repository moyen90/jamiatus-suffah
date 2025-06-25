"use client"

interface MarkdownPreviewProps {
  content: string
}

function MarkdownPreview({ content }: MarkdownPreviewProps) {
  // Simple markdown to HTML converter
  const convertMarkdownToHTML = (markdown: string): string => {
    if (!markdown) return '<p class="text-muted-foreground italic">Start writing to see preview...</p>'

    let html = markdown
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-6 mb-3">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-semibold mt-8 mb-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-6">$1</h1>')

      // Bold and Italic
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

      // Inline code
      .replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>')

      // Links
      .replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" class="text-blue-600 hover:text-blue-800 underline">$1</a>')

      // Images
      .replace(/!\[([^\]]*)\]$$([^)]+)$$/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />')

      // Blockquotes
      .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-muted pl-4 italic my-4">$1</blockquote>')

      // Horizontal rules
      .replace(/^---$/gim, '<hr class="my-8 border-t border-muted" />')

      // Code blocks
      .replace(
        /```([\s\S]*?)```/g,
        '<pre class="bg-muted p-4 rounded-lg overflow-x-auto my-4"><code class="text-sm font-mono">$1</code></pre>',
      )

      // Unordered lists
      .replace(/^- (.*$)/gim, '<li class="ml-4">$1</li>')
      .replace(/(<li class="ml-4">.*<\/li>)/s, '<ul class="list-disc list-inside space-y-1 my-4">$1</ul>')

      // Ordered lists
      .replace(/^\d+\. (.*$)/gim, '<li class="ml-4">$1</li>')

      // Line breaks
      .replace(/\n\n/g, '</p><p class="mb-4">')
      .replace(/\n/g, "<br />")

    // Wrap in paragraphs if not already wrapped
    if (!html.startsWith("<")) {
      html = '<p class="mb-4">' + html + "</p>"
    }

    return html
  }

  return (
    <div
      className="prose prose-gray dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: convertMarkdownToHTML(content) }}
    />
  )
}

export default MarkdownPreview
