import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "lucide-react";

export interface ICustomDropdown<T> {
  placeholder: string;
  width?: string;
  options: T[];
  handleChange?: (value: string) => void;
  defaultValue?: string;
  getValue: (item: T) => string | number;
  getLabel: (item: T) => string;
  isDate?: boolean;
  className?: string;
}

const CustomDropdown = <T,>({
  placeholder,
  width = "w-[90px]",
  options,
  handleChange,
  defaultValue,
  getValue,
  getLabel,
  isDate = false,
  className,
}: ICustomDropdown<T>) => {
  return (
    <Select
      defaultValue={defaultValue}
      onValueChange={(value) => handleChange && handleChange(value)}
      value={defaultValue}
    >
      <SelectTrigger
        className={`${width} !h-[30px] text-[#272727] text-sm border border-[#E2E2E2]  rounded-full  flex items-center justify-center  bg-[#F3F1F1] cursor-pointer hover:bg-gray-100 ${className}`}
      >
        {isDate && <Calendar className="size-4" />}
        <SelectValue defaultValue={defaultValue} placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent className={`z-[1000] ${width}`} align="start">
        <ScrollArea
          className={`${options.length > 4 ? "h-[200px]" : "h-full"}`}
        >
          <div className="p-1">
            {options.map((option, index) => (
              <SelectItem key={index} value={getValue(option).toString()}>
                {getLabel(option)}
              </SelectItem>
            ))}
          </div>
        </ScrollArea>
      </SelectContent>
    </Select>
  );
};

export default CustomDropdown;
