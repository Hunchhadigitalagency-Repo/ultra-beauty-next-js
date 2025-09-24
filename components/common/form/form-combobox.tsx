"use client";

import * as React from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { LucideSearch } from "lucide-react";

export interface ComboboxOption {
  label: string;
  value: string;
}

interface FormSelectWithSearchProps {
  form: UseFormReturn<any>;
  name: string;
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  options: ComboboxOption[];
  isRequired?: boolean;
}

export function FormCombobox({
  form,
  name,
  label,
  placeholder,
  searchPlaceholder = "Select an option...",
  options,
  isRequired,
}: FormSelectWithSearchProps) {
  const [search, setSearch] = React.useState("");

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );


  console.log(options, 'Options');

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        console.log('Field: ', field);
        // console.log(options.find((opt) => opt.value === String(field.value)))
        return (
          <FormItem>
            {label && (
              <FormLabel>
                {label} {isRequired && <span className="text-red-500">*</span>}
              </FormLabel>
            )}
            <Select
              onValueChange={(val) => {
                field.onChange(val);
              }}
              value={field.value}
            >
              <FormControl>
                <SelectTrigger className="bg-white">
                  <SelectValue
                    placeholder={placeholder}
                    defaultValue={field.value}
                  />
                  {/* {options.find((opt) => opt.value === field.value)?.label} */}
                  {/* </SelectValue> */}
                </SelectTrigger>
              </FormControl>

              <SelectContent className="p-0">
                <div className="p-2 sticky top-0 bg-white z-10 flex items-center space-x-2">
                  <LucideSearch className="w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder={searchPlaceholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-8 text-sm flex-1"
                    autoFocus
                    onKeyDown={(e) => e.stopPropagation()}
                  />
                </div>

                <div className="max-h-60 overflow-y-auto">
                  {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-2 text-sm text-muted-foreground">No results found</div>
                  )}
                </div>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  );
}
