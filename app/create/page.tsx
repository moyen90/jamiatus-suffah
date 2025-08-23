"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, FileText, Edit, Eye, Split } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import MarkdownEditor from "@/components/markdown-editor"
import MarkdownPreview from "@/components/markdown-preview"
import { useCreateBlog } from "@/apis/blogs"

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  content: z.string().min(10, { message: "Content must be at least 10 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  date: z.date(),
  category: z.string().min(2, { message: "Category must be at least 2 characters." }),
})

const estimateReadTime = (content: string) => {
  const wordsPerMinute = 200
  const numberOfWords = content.trim().split(/\s+/).filter(Boolean).length
  const minutes = numberOfWords / wordsPerMinute
  return Math.ceil(minutes) + " min read"
}

const CreatePage = () => {
  const [viewMode, setViewMode] = useState<"edit" | "preview" | "split">("edit")
  const router = useRouter()
  const { mutateAsync,isLoading } = useCreateBlog()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      content: "",
      description: "",
      date: new Date(),
      category: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log(values)
    try {
      await mutateAsync({
        title: values.title,
        content: values.content,
        description: values.description,
        date: values.date.toISOString(),
        category: values.category,
      })
      router.push("/")
    } catch (error) {
      console.error("Failed to create blog", error)
    }
  }

  const contentValue = form.watch("content")

  return (
    <div className="container mx-auto py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Blog Editor */}
            <Card className="col-span-1 lg:col-span-2">
              <CardHeader>
                <CardTitle>Blog Post</CardTitle>
                <CardDescription>Fill all the fields carefully.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Title of your blog post" {...field} />
                      </FormControl>
                      <FormDescription>This is the title of your blog post.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Content */}
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        <Card>
                          <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                              <span className="flex items-center">
                                <FileText className="w-5 h-5 mr-2" /> Content
                              </span>
                              <div className="flex items-center gap-2">
                                <Button type="button" variant={viewMode === "edit" ? "default" : "outline"} size="sm" onClick={() => setViewMode("edit")}>
                                  <Edit className="w-4 h-4 mr-1" /> Edit
                                </Button>
                                <Button type="button" variant={viewMode === "preview" ? "default" : "outline"} size="sm" onClick={() => setViewMode("preview")}>
                                  <Eye className="w-4 h-4 mr-1" /> Preview
                                </Button>
                                <Button type="button" variant={viewMode === "split" ? "default" : "outline"} size="sm" onClick={() => setViewMode("split")}>
                                  <Split className="w-4 h-4 mr-1" /> Split
                                </Button>
                              </div>
                            </CardTitle>
                            <CardDescription>Write your blog post using Markdown syntax.</CardDescription>
                          </CardHeader>
                          <CardContent>
                            {viewMode === "edit" && (
                              <div className="space-y-4">
                                <FormControl>
                                  <MarkdownEditor value={field.value} onChange={field.onChange} />
                                </FormControl>
                                <div className="text-sm text-muted-foreground">
                                  Word count: {field.value.trim().split(/\s+/).filter(Boolean).length} words
                                  {field.value && ` • Estimated read time: ${estimateReadTime(field.value)}`}
                                </div>
                              </div>
                            )}
                            {viewMode === "preview" && (
                              <div className="min-h-[400px] border rounded-md p-4">
                                <MarkdownPreview content={field.value} />
                              </div>
                            )}
                            {viewMode === "split" && (
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-[400px]">
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">Editor</Label>
                                  <FormControl>
                                    <MarkdownEditor value={field.value} onChange={field.onChange} />
                                  </FormControl>
                                </div>
                                <div className="space-y-2">
                                  <Label className="text-sm font-medium">Preview</Label>
                                  <div className="border rounded-md p-4 h-full overflow-auto">
                                    <MarkdownPreview content={field.value} />
                                  </div>
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Blog Meta */}
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Meta</CardTitle>
                <CardDescription>Blog post meta information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Description" className="resize-none" {...field} />
                      </FormControl>
                      <FormDescription>This is the description of your blog post.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-y-3">
                      <FormLabel>Date</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("w-[240px] pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormDescription>Date of publish.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Development">Development</SelectItem>
                          <SelectItem value="Design">Design</SelectItem>
                          <SelectItem value="React">React</SelectItem>
                          <SelectItem value="TypeScript">TypeScript</SelectItem>
                          <SelectItem value="CSS">CSS</SelectItem>
                          <SelectItem value="Performance">Performance</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Category of your blog post.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Blog"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default CreatePage
