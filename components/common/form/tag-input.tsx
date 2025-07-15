"use client"

import type React from "react"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useState, useRef, type KeyboardEvent } from "react"
import { cn } from "@/lib/utils"

interface TagInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export default function TagInput({ value, onChange, placeholder, className }: TagInputProps) {
  const [inputValue, setInputValue] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)

  // Convert string to array of tags
  const tags = value
    ? value
        ?.split(",")
        ?.map((tag) => tag.trim())
        ?.filter((tag) => tag.length > 0)
    : []

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim()
    if (trimmedTag && !tags.includes(trimmedTag)) {
      const newTags = [...tags, trimmedTag]
      onChange(newTags.join(", "))
    }
    setInputValue("")
  }

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove)
    onChange(newTags.join(", "))
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      if (inputValue.trim()) {
        addTag(inputValue)
      }
    } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      removeTag(tags[tags.length - 1])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.includes(",")) {
      const newTags = value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0)
      newTags.forEach((tag) => {
        if (!tags.includes(tag)) {
          addTag(tag)
        }
      })
    } else {
      setInputValue(value)
    }
  }

  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  return (
    <div
      onClick={handleContainerClick}
      className={cn(
        "flex min-h-10 w-full rounded-md border border-input  px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-within:ring-1 focus-within:ring-ring cursor-text",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-1 flex-1">
        {tags?.map((tag, index) => (
          <Badge key={index} variant="secondary" className="px-2 py-0.5 text-xs flex items-center gap-1 h-6">
            {tag}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                removeTag(tag)
              }}
              className="ml-1 hover:bg-muted-foreground/20 rounded-full p-0.5"
            >
              <X className="h-2.5 w-2.5" />
            </button>
          </Badge>
        ))}
        <input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground"
        />
      </div>
    </div>
  )
}
