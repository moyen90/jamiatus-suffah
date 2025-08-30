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
  return Math.ceil(minutes) + " min"
}

const CreatePage = () => {
  const [viewMode, setViewMode] = useState<"edit" | "preview" | "split">("edit")
  const router = useRouter()
  const { mutateAsync } = useCreateBlog()

  const [isLoading, setIsLoading] = useState(false)

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
      setIsLoading(true)
      await mutateAsync({
        title: values.title,
        content: values.content,
        description: values.description,
        date: values.date.toISOString(),
        category: values.category,
      })
      router.push("/")
      setIsLoading(false)
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
                <CardTitle>মাসালা-মাসায়েল</CardTitle>
                <CardDescription>সঠিক দিকনির্দেশনা প্রদান করুন।</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Title */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>টাইটেল</FormLabel>
                      <FormControl>
                        <Input placeholder="টাইটেল লিখুন " {...field} />
                      </FormControl>
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
                                <FileText className="w-5 h-5 mr-2" /> মাসায়েল
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
                          </CardHeader>
                          <CardContent>
                            {viewMode === "edit" && (
                              <div className="space-y-4">
                                <FormControl>
                                  <MarkdownEditor value={field.value} onChange={field.onChange} />
                                </FormControl>
                                <div className="text-sm text-muted-foreground">
                                  শব্দ গণনা: {field.value.trim().split(/\s+/).filter(Boolean).length} শব্দ
                                  {field.value && ` • পড়তে সময় লাগবে : ${estimateReadTime(field.value)}`}
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
                <CardTitle>সাধারণ তথ্য</CardTitle>
                <CardDescription>মাসায়েলের সাধারণ তথ্য।</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ক্যাটাগরি</FormLabel>
                      {/* <Select onValueChange={field.onChange} defaultValue={field.value}>
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
                      </Select> */}

                      <FormControl>
                        <Input placeholder="ক্যাটাগরি লিখুন" {...field} />
                      </FormControl>
                      <FormDescription>মাসায়েল এর ক্যাটাগরি.</FormDescription>
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
