"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import categoriesData from "@/categories.json"

interface Category {
    name: string
    sub_categories: Category[]
}

interface CategorySelectorProps {
    onSelect: (path: string[]) => void
    initialPath?: string[]
}

export function CategorySelector({ onSelect, initialPath = [] }: CategorySelectorProps) {
    const [selectedPath, setSelectedPath] = React.useState<string[]>(initialPath)
    const [openIndex, setOpenIndex] = React.useState<number | null>(null)

    const handleSelect = (level: number, value: string) => {
        const newPath = selectedPath.slice(0, level)
        newPath[level] = value
        setSelectedPath(newPath)
        setOpenIndex(null)
        onSelect(newPath)
    }

    const getSubCategories = (level: number): Category[] => {
        if (level === 0) return categoriesData as Category[]

        let current: Category | undefined
        let items: Category[] = categoriesData as Category[]

        for (let i = 0; i < level; i++) {
            current = items.find(item => item.name === selectedPath[i])
            if (!current) return []
            items = current.sub_categories
        }

        return items
    }

    const levelsToShow = selectedPath.length + 1

    return (
        <div className="flex flex-col gap-4 w-full">
            {Array.from({ length: levelsToShow }).map((_, index) => {
                const options = getSubCategories(index)
                if (options.length === 0 && index > 0) return null

                const label = index === 0 ? "প্রধান ক্যাটাগরি" : `সাব-ক্যাটাগরি (লেভেল ${index})`
                const currentValue = selectedPath[index] || ""

                return (
                    <div key={index} className="space-y-2">
                        <label className="text-sm font-medium">{label}</label>
                        <Popover
                            open={openIndex === index}
                            onOpenChange={(open) => setOpenIndex(open ? index : null)}
                        >
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className="w-full justify-between"
                                >
                                    {currentValue || "সিলেক্ট করুন..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full p-0">
                                <Command>
                                    <CommandInput placeholder="খুঁজুন..." />
                                    <CommandList>
                                        <CommandEmpty>কোন কিছু পাওয়া যায়নি।</CommandEmpty>
                                        <CommandGroup>
                                            {options.map((opt) => (
                                                <CommandItem
                                                    key={opt.name}
                                                    value={opt.name}
                                                    onSelect={() => handleSelect(index, opt.name)}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            currentValue === opt.name ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {opt.name}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                    </div>
                )
            })}
        </div>
    )
}
