import { Input } from "@/components/ui/input";
import { Paperclip, } from "lucide-react";
import { useState } from "react";

interface FileUploaderProps {
    onChange?: (value: File | undefined) => void;
    onRemove: () => void;
    value: File | undefined;
    fileType?: string; // e.g., "application/pdf"
}

export default function SingleFileUploader({
    onChange,
    fileType,
    value,
}: FileUploaderProps) {
    const [fileName, setFileName] = useState(value ? value.name : "");


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onChange?.(file);
            setFileName(file.name);
            e.target.value = "";
        }
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center w-full">
                <label
                    htmlFor="file-upload"
                    className="flex-1 flex items-center justify-between w-full border rounded-md px-4 py-2 cursor-pointer bg-white"
                >
                    <span className="text-gray-400 text-sm truncate">
                        {fileName || "Select your Attachment"}
                    </span>
                    <Paperclip className="h-5 w-5 text-gray-400" />
                    <Input
                        id="file-upload"
                        type="file"
                        className="hidden w-full"
                        accept={fileType || "*/*"}
                        onChange={handleFileChange}
                    />
                </label>
            </div>
        </div>
    );
}
