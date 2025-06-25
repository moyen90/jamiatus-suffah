"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import {
  Bold,
  Italic,
  Code,
  Link,
  List,
  ListOrdered,
  Quote,
  Heading1,
  Heading2,
  Heading3,
  ImageIcon,
  Minus,
} from "lucide-react"

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertText = (before: string, after = "", placeholderText = "") => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const textToInsert = selectedText || placeholderText

    const newText = value.substring(0, start) + before + textToInsert + after + value.substring(end)
    onChange(newText)

    // Set cursor position after insertion
    setTimeout(() => {
      const newCursorPos = start + before.length + textToInsert.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
      textarea.focus()
    }, 0)
  }

  const insertAtNewLine = (text: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const beforeCursor = value.substring(0, start)
    const afterCursor = value.substring(start)

    // Check if we need to add a newline before
    const needsNewlineBefore = beforeCursor.length > 0 && !beforeCursor.endsWith("\n")
    const prefix = needsNewlineBefore ? "\n" + text : text

    const newText = beforeCursor + prefix + afterCursor
    onChange(newText)

    setTimeout(() => {
      const newCursorPos = start + prefix.length
      textarea.setSelectionRange(newCursorPos, newCursorPos)
      textarea.focus()
    }, 0)
  }

  const toolbarButtons = [
    {
      icon: Heading1,
      label: "Heading 1",
      action: () => insertAtNewLine("# "),
    },
    {
      icon: Heading2,
      label: "Heading 2",
      action: () => insertAtNewLine("## "),
    },
    {
      icon: Heading3,
      label: "Heading 3",
      action: () => insertAtNewLine("### "),
    },
    {
      icon: Bold,
      label: "Bold",
      action: () => insertText("**", "**", "bold text"),
    },
    {
      icon: Italic,
      label: "Italic",
      action: () => insertText("*", "*", "italic text"),
    },
    {
      icon: Code,
      label: "Inline Code",
      action: () => insertText("`", "`", "code"),
    },
    {
      icon: Link,
      label: "Link",
      action: () => insertText("[", "](url)", "link text"),
    },
    {
      icon: ImageIcon,
      label: "Image",
      action: () => insertText("![", "](image-url)", "alt text"),
    },
    {
      icon: List,
      label: "Bullet List",
      action: () => insertAtNewLine("- "),
    },
    {
      icon: ListOrdered,
      label: "Numbered List",
      action: () => insertAtNewLine("1. "),
    },
    {
      icon: Quote,
      label: "Quote",
      action: () => insertAtNewLine("> "),
    },
    {
      icon: Minus,
      label: "Horizontal Rule",
      action: () => insertAtNewLine("\n---\n"),
    },
  ]

  const insertCodeBlock = () => {
    insertAtNewLine("\n```\ncode here\n```\n")
  }

  return (
    <div className="space-y-2">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 border rounded-md bg-muted/50">
        {toolbarButtons.map((button, index) => (
          <Button
            key={index}
            type="button"
            variant="ghost"
            size="sm"
            onClick={button.action}
            title={button.label}
            className="h-8 w-8 p-0"
          >
            <button.icon className="h-4 w-4" />
          </Button>
        ))}
        <div className="w-px h-6 bg-border mx-1" />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={insertCodeBlock}
          title="Code Block"
          className="h-8 px-2 text-xs"
        >
          {"</>"}
        </Button>
      </div>

      {/* Editor */}
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Write your blog post content using Markdown..."}
        className="min-h-[400px] font-mono text-sm resize-none"
      />

      {/* Markdown Help */}
      <details className="text-sm text-muted-foreground">
        <summary className="cursor-pointer hover:text-foreground">Markdown Quick Reference</summary>
        <div className="mt-2 space-y-1 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div>
              <p>
                <code># Heading 1</code>
              </p>
              <p>
                <code>## Heading 2</code>
              </p>
              <p>
                <code>**bold text**</code>
              </p>
              <p>
                <code>*italic text*</code>
              </p>
              <p>
                <code>`inline code`</code>
              </p>
            </div>
            <div>
              <p>
                <code>[link text](url)</code>
              </p>
              <p>
                <code>![alt text](image-url)</code>
              </p>
              <p>
                <code>- bullet point</code>
              </p>
              <p>
                <code>1. numbered list</code>
              </p>
              <p>
                <code>&gt; blockquote</code>
              </p>
            </div>
          </div>
        </div>
      </details>
    </div>
  )
}

export default MarkdownEditor
