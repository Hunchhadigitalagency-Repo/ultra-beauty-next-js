import { useRef, useState } from "react";
import { UploadIcon, X } from "lucide-react";

import { toast } from "sonner";
import { handleError } from "@/lib/error-handler";
import Image from "next/image";

export interface FileWithMetadata {
  file: File | string;
  id?: number;
}

interface ImageUploadProps {
  onChange?: (files: FileWithMetadata[]) => void;
  onRemove: (files: FileWithMetadata[]) => void;
  value: FileWithMetadata[];
  isMultiple?: boolean;
  setConvertedFile?: (files: FileWithMetadata[]) => void;
  accept?: string;
  type?: string;
  isEdit?: boolean;
}

export default function MultiImageUploader({
  onChange,
  onRemove,
  value,
  isMultiple,
  setConvertedFile,
  accept = ".pdf,.docx,.jpeg,.png,.jpg,.webp",
  type,
  isEdit = false,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
//   const [showDragDrop, setShowDragDrop] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);

  const handleDeleteFile = async (index: number) => {
    const fileToDelete = value[index];
    const updatedFiles = [...value];

    if (typeof fileToDelete.file === "string" && isEdit && fileToDelete.id) {
      setIsDeleting(index);
      try {
        console.log(type);
        // if (type === ETypes.LEADS) {
        //   await deleteLeadAttachmentFile(fileToDelete.id);
        // }

        toast.success("File deleted successfully");
      } catch (error) {
        handleError(error, toast);
        setIsDeleting(null);
        return;
      }
      setIsDeleting(null);
    }

    updatedFiles.splice(index, 1);
    onRemove(updatedFiles);
    setConvertedFile?.(updatedFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    processFiles(files);
    e.target.value = ""; // Clear input
    // setShowDragDrop(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
    // setShowDragDrop(false);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();

    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    processFiles(e.dataTransfer.files);
    // setShowDragDrop(false);
  };

  const processFiles = (files: FileList | null) => {
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files).map((file) => ({
        file: file,
      }));

      const updatedFiles = isMultiple
        ? [...value, ...selectedFiles]
        : selectedFiles;

      onChange?.(updatedFiles);
      setConvertedFile?.(updatedFiles);
    }
  };

  return (
    <div className="space-y-6">
        <div
          className={`space-y-4 ${
            isDragging
              ? "bg-gray-100 border-2 border-dashed border-primary"
              : ""
          }`}
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
              <span className="text-sm mt-2">Drag & Drop or Click Here</span>
              <span className="text-xs">Supported File: {accept}</span>
              <span className="text-xs mt-1">Maximum file size: 1MB</span>
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
  


        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {value?.map((item, index) => {
          return (
            <div className="relative" key={index}>
              <Image
                src={
                  typeof item.file === "string"
                    ? item.file
                    : URL.createObjectURL(item.file) || "/placeholder.svg"
                }
                width={100}
                height={100}
                alt="Content cover"
                className="h-32 object-cover rounded-lg"
              />
              <button
                type="button"
                onClick={() => handleDeleteFile(index)}
                className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                disabled={isDeleting === index}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}

        {/* {!showDragDrop && (
          <Button
            type="button"
            onClick={() => setShowDragDrop(true)}
            className="py-2 px-4 h-[60px] bg-white border border-customGray hover:bg-gray-300"
          >
            <Plus className="h-4 w-4 text-black" />
          </Button>
        )} */}
      </div>
    </div>
  );
}
