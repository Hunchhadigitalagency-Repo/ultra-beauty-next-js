import { ImagePlus, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface FileUploaderProps {
  onChange?: (value: string | File | undefined) => void;
  onRemove: () => void;
  value: string | File | undefined;
  acceptedFileTypes?: string;
  size?: string;
  id?: string; // 👈 add id
}

export default function SingleImageUploader({
  onChange,
  onRemove,
  value,
  size = "big",
  id,
}: FileUploaderProps) {
  const [showDragDrop, setShowDragDrop] = useState(!value);

  const handleDeleteFile = () => {
    onRemove();
    onChange?.("");
    setShowDragDrop(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange?.(file);
      e.target.value = "";
      setShowDragDrop(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className={`flex items-start gap-6`}>
        {value && (
          <div className="relative">
            <Image
              src={
                typeof value === "string"
                  ? value
                  : URL.createObjectURL(value) || "/placeholder.svg"
              }
              width={100}
              height={100}
              alt="Content cover"
              className="h-32 object-cover rounded-lg"
            />
            <button
              type="button"
              onClick={handleDeleteFile}
              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {showDragDrop && (
        <label
          htmlFor={id || 'cover-upload'} 
          className={`border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer flex ${size === "small" ? "py-1" : "justify-center"
            } items-center gap-6`}
        >
          <ImagePlus
            className={` ${size === "small"
              ? " text-gray-900 w-8 h-8"
              : " text-gray-500 w-20 h-20"
              }`}
            strokeWidth={0.5}
          />
          <div className="">
            <span className="text-sm text-gray-600">Drag and drop or </span>
            <span className="text-sm text-primary">upload image</span>
          </div>
          <input
            id={id || 'cover-upload'} 
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
      )}
    </div>
  );
}
