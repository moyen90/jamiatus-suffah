"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import { StarterKit } from "@tiptap/starter-kit"
import { Placeholder } from "@tiptap/extension-placeholder"
import { HardBreak } from "@tiptap/extension-hard-break"
import { Button } from "@/components/ui/button"
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
} from "lucide-react"
import { useEffect, useState } from "react"

// Simple HTML to Markdown converter for basic elements
const htmlToMarkdown = (html: string): string => {
  let markdown = html
    // Headings
    .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
    .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
    .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
    .replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
    .replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n')
    .replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n')
    // Bold and italic
    .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    // Strike through
    .replace(/<s[^>]*>(.*?)<\/s>/gi, '~~$1~~')
    .replace(/<del[^>]*>(.*?)<\/del>/gi, '~~$1~~')
    // Code
    .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
    .replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gi, '```\n$1\n```\n')
    // Links
    .replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    // Images
    .replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*>/gi, '![$2]($1)')
    .replace(/<img[^>]*alt="([^"]*)"[^>]*src="([^"]*)"[^>]*>/gi, '![$1]($2)')
    .replace(/<img[^>]*src="([^"]*)"[^>]*>/gi, '![]($1)')
    // Lists
    .replace(/<ul[^>]*>/gi, '')
    .replace(/<\/ul>/gi, '\n')
    .replace(/<ol[^>]*>/gi, '')
    .replace(/<\/ol>/gi, '\n')
    .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    // Blockquotes
    .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1\n\n')
    // Horizontal rule
    .replace(/<hr[^>]*>/gi, '\n---\n\n')
    // Paragraphs - preserve multiple paragraph breaks
    .replace(/<p[^>]*><\/p>/gi, '\n\n')  // Empty paragraphs become double newlines
    .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
    // Line breaks - preserve hard breaks as double spaces + newline (markdown format)
    .replace(/<br[^>]*>/gi, '  \n')
    // Remove remaining HTML tags
    .replace(/<[^>]*>/g, '')
    // Clean up excessive whitespace but preserve intentional spacing
    .replace(/\n{5,}/g, '\n\n\n\n')  // Limit to max 4 newlines
    .replace(/[ \t]+\n/g, '  \n')  // Ensure hard breaks have exactly 2 spaces
    .trim()

  return markdown
}

// Simple Markdown to HTML converter for basic elements
const markdownToHtml = (markdown: string): string => {
  let html = markdown
    // Headings
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Strike through
    .replace(/~~(.*?)~~/g, '<s>$1</s>')
    // Code
    .replace(/`(.*?)`/g, '<code>$1</code>')
    // Code blocks
    .replace(/```\n([\s\S]*?)\n```/g, '<pre><code>$1</code></pre>')
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Images
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />')
    // Horizontal rule
    .replace(/^---$/gm, '<hr>')
    // Blockquotes
    .replace(/^> (.*)$/gm, '<blockquote>$1</blockquote>')
    // Unordered lists
    .replace(/^\- (.*)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*<\/li>)/, '<ul>$1</ul>')
    // Hard breaks (two spaces + newline in markdown)
    .replace(/  \n/g, '<br>')
    // Regular line breaks
    .replace(/\n/g, '<br>')

  return html
}

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        hardBreak: {
          keepMarks: false,
          HTMLAttributes: {},
        },
        paragraph: {
          HTMLAttributes: {},
        },
        bold: {},
        italic: {},
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
          HTMLAttributes: {},
        },
        bulletList: {
          HTMLAttributes: {},
        },
        orderedList: {
          HTMLAttributes: {},
        },
        listItem: {
          HTMLAttributes: {},
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || "Write your blog post content...",
      }),
    ],
    content: value || '<p></p>',
    onUpdate: ({ editor }) => {
      const html = editor.getHTML()
      onChange(html)
    },
    editorProps: {
      attributes: {
        class: "focus:outline-none min-h-[400px] p-4",
        style: "min-height: 400px;",
      },
      handleKeyDown: (view, event) => {
        if (event.key === 'Enter') {
          const { state, dispatch } = view
          const { selection } = state
          const { $from } = selection

          // Check if we're in a heading or list - allow normal behavior
          if ($from.parent.type.name === 'heading' ||
            $from.parent.type.name === 'listItem' ||
            $from.parent.type.name === 'bulletList' ||
            $from.parent.type.name === 'orderedList') {
            return false // Let TipTap handle normal behavior
          }

          // Count existing consecutive <br> tags before cursor
          const beforeText = $from.parent.textContent.slice(0, $from.parentOffset)
          const html = view.dom.innerHTML
          const brMatches = html.match(/(<br[^>]*>){1,3}$/g)
          const consecutiveBrs = brMatches ? brMatches[0].split('<br').length - 1 : 0

          // Allow up to 3 <br> tags
          if (consecutiveBrs < 3) {
            const hardBreak = state.schema.nodes.hardBreak.create()
            const tr = state.tr.replaceSelectionWith(hardBreak)
            dispatch(tr)
            return true
          }

          return true // Prevent more than 3 breaks
        }
        return false
      },
    },
  })

  // Update editor content when value changes externally
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '<p></p>')
    }
  }, [editor, value])



  if (!isMounted || !editor) {
    return (
      <div className="space-y-2">
        <div className="flex flex-wrap gap-1 p-2 border rounded-md bg-muted/50">
          <div className="text-sm text-muted-foreground">Loading editor...</div>
        </div>
        <div className="min-h-[400px] animate-pulse bg-muted rounded-md flex items-center justify-center">
          <div className="text-muted-foreground">Initializing editor...</div>
        </div>
      </div>
    )
  }

  const toolbarButtons = [
    {
      icon: Bold,
      label: "Bold",
      action: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: Italic,
      label: "Italic",
      action: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      icon: Heading1,
      label: "Heading 1",
      action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: Heading2,
      label: "Heading 2",
      action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: List,
      label: "Bullet List",
      action: () => editor.chain().focus().toggleBulletList().run(),
      isActive: editor.isActive("bulletList"),
    },
    {
      icon: ListOrdered,
      label: "Numbered List",
      action: () => editor.chain().focus().toggleOrderedList().run(),
      isActive: editor.isActive("orderedList"),
    },
  ]



  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border rounded-md bg-muted/50 sticky top-0 z-10">
        {toolbarButtons.map((button, index) => (
          <Button
            key={index}
            type="button"
            variant={button.isActive ? "default" : "ghost"}
            size="sm"
            onClick={button.action}
            title={button.label}
            className="h-8 w-8 p-0"
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
      </div>

      {/* Editor */}
      <div className="border rounded-md min-h-[400px] bg-background">
        <EditorContent
          editor={editor}
          className="min-h-[400px]"
        />
      </div>

      {/* Quick Help */}
      <details className="text-sm text-muted-foreground">
        <summary className="cursor-pointer hover:text-foreground">Editor Shortcuts</summary>
        <div className="mt-2 space-y-1 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <p><kbd>Ctrl/Cmd + B</kbd> - Bold</p>
              <p><kbd>Ctrl/Cmd + I</kbd> - Italic</p>
              <p><kbd>Ctrl/Cmd + K</kbd> - Link</p>
              <p><kbd>Ctrl/Cmd + Z</kbd> - Undo</p>
              <p><kbd>Ctrl/Cmd + Y</kbd> - Redo</p>
            </div>
            <div>
              <p><kbd># + Space</kbd> - Heading 1</p>
              <p><kbd>## + Space</kbd> - Heading 2</p>
              <p><kbd>- + Space</kbd> - Bullet List</p>
              <p><kbd>1. + Space</kbd> - Numbered List</p>
              <p><kbd>&gt; + Space</kbd> - Blockquote</p>
              <p><kbd>Enter</kbd> - Line Break (max 3)</p>
            </div>
          </div>
        </div>
      </details>
    </div>
  )
}

export default MarkdownEditor
