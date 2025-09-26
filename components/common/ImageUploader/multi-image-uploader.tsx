"use client"

import type React from "react"

import { useRef, useState } from "react"
import { File, UploadIcon, X } from "lucide-react"
import { toast } from "sonner"
import { handleError } from "@/lib/error-handler"
import Image from "next/image"
import type { UseFormReturn } from "react-hook-form"

export interface FileWithMetadata {
  file: File | string
  id?: number
}

interface ImageUploadProps {
  onChange?: (files: FileWithMetadata[]) => void
  onRemove: (files: FileWithMetadata[]) => void
  value: FileWithMetadata[]
  isMultiple?: boolean
  setConvertedFile?: (files: FileWithMetadata[]) => void
  accept?: string
  type?: string
  isEdit?: boolean
  form?: UseFormReturn<any>
  fieldName?: string
}

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

export default function MultiImageUploader({
  onChange,
  onRemove,
  value,
  isMultiple,
  setConvertedFile,
  accept = ".pdf,.docx,.jpeg,.png,.jpg,.webp",
  isEdit = false,
  form,
  fieldName = "images",
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isDeleting, setIsDeleting] = useState<number | null>(null)

  const validateFiles = (files: File[]): { validFiles: File[]; errors: string[] } => {
    const validFiles: File[] = []
    const errors: string[] = []

    files.forEach((file) => {
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`File "${file.name}" size should be less than 10MB`)
      } else if (!ACCEPTED_TYPES.includes(file.type)) {
        errors.push(`File "${file.name}" must be a valid image (jpeg, jpg, png, webp)`)
      } else {
        validFiles.push(file)
      }
    })

    return { validFiles, errors }
  }

  const handleDeleteFile = async (index: number) => {
    const fileToDelete = value[index]
    const updatedFiles = [...value]

    if (typeof fileToDelete.file === "string" && isEdit && fileToDelete.id) {
      setIsDeleting(index)
      try {
        toast.success("File deleted successfully")
      } catch (error) {
        handleError(error, toast)
        setIsDeleting(null)
        return
      }
      setIsDeleting(null)
    }

    updatedFiles.splice(index, 1)
    onRemove(updatedFiles)
    setConvertedFile?.(updatedFiles)

    if (form) {
      setTimeout(() => {
        form.trigger(fieldName)
      }, 0)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    processFiles(files)
    e.target.value = ""
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    processFiles(e.dataTransfer.files)
  }

  const processFiles = (files: FileList | null) => {
    if (files && files.length > 0) {
      const fileArray = Array.from(files)

      const { validFiles, errors } = validateFiles(fileArray)

      if (errors.length > 0) {
        errors.forEach((error) => {
          toast.error(error)
        })

        if (form && errors.length > 0) {
          form.setError(fieldName, {
            type: "manual",
            message: errors[0], // Show first error in the field
          })
        }
      }

      if (validFiles.length > 0) {
        const selectedFiles = validFiles.map((file) => ({
          file: file,
        }))

        const updatedFiles = isMultiple ? [...value, ...selectedFiles] : selectedFiles

        onChange?.(updatedFiles)
        setConvertedFile?.(updatedFiles)

        if (form) {
          if (errors.length === 0) {
            form.clearErrors(fieldName)
          }
          setTimeout(() => {
            form.trigger(fieldName)
          }, 0)
        }
      }
    }
  }

  return (
    <div className="space-y-6">
      <div
        className={`space-y-4 ${isDragging ? "bg-gray-100 border-2 border-dashed border-primary" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label
          htmlFor="file-input"
          className={`flex items-center justify-center h-36 w-full border-2 rounded-md cursor-pointer bg-white ${
            isDragging ? "border-primary bg-primary/10" : ""
          }`}
        >
          <div className="flex flex-col items-center text-gray-500">
            <UploadIcon className="size-10" />
            <span className="mt-2 text-sm">Drag & Drop or Click Here</span>
            <span className="text-xs">Supported File: {accept}</span>
            <span className="mt-1 text-xs">Maximum file size: 10MB</span>
          </div>
          <input
            ref={inputRef}
            id="file-input"
            type="file"
            name="file"
            accept={accept}
            className="hidden"
            multiple={isMultiple}
            onChange={handleFileChange}
          />
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {value?.map((item, index) => {
          const fileObj = item.file
          const isString = typeof fileObj === "string"
          const fileName = isString ? fileObj.split("/").pop() || "file" : fileObj.name

          const fileExtension = fileName.split(".").pop()?.toLowerCase()

          const isImage = ["jpg", "jpeg", "png", "webp"].includes(fileExtension || "")
          const isPDF = fileExtension === "pdf"
          const isDoc = ["doc", "docx"].includes(fileExtension || "")

          return (
            <div className="relative border" key={index}>
              {isImage ? (
                <Image
                  src={isString ? (fileObj as string) : URL.createObjectURL(fileObj as File) || "/placeholder.svg"}
                  width={100}
                  height={100}
                  alt="Uploaded"
                  className="object-cover h-32 rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center justify-center h-32 p-2 text-center text-gray-700 bg-gray-100 border rounded-lg">
                  {isPDF && (
                    <p>
                      <File />
                      PDF
                    </p>
                  )}
                  {isDoc && (
                    <p>
                      <File />
                      DOC
                    </p>
                  )}
                  <p className="w-full px-1 mt-2 text-xs truncate">{fileName}</p>
                </div>
              )}
              <button
                type="button"
                onClick={() => handleDeleteFile(index)}
                className="absolute p-1 text-white bg-red-500 rounded-full -top-2 -right-2 hover:bg-red-600"
                disabled={isDeleting === index}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
