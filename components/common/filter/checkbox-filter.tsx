"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CheckboxFilterItem } from "./checkbox-filter-item";

interface FilterOption {
  id: number;
  name: string;
  product_count?: number;
}

interface CheckboxFilterProps {
  id: string;
  title: string;
  options: FilterOption[];
  selectedValues: number[];
  onChange: (value: number, checked: boolean) => void;
}

export function CheckboxFilter({
  id,
  title,
  options,
  selectedValues,
  onChange,
}: CheckboxFilterProps) {
  return (
    <Accordion defaultValue={[id]} type="multiple">
      <AccordionItem value={id} className="border-none">
        <AccordionTrigger className="text-sm sm:text-base font-poppins font-medium text-foreground py-3 hover:no-underline">
          {title}
        </AccordionTrigger>
        <AccordionContent>
          <div
            className="space-y-3 max-h-28 overflow-y-auto pr-2"
            style={{
              scrollbarWidth: "thin",
              scrollbarColor: "#e2e8f0 transparent" 
            }}
          >
            <style
              dangerouslySetInnerHTML={{
                __html: `
              .custom-scroll::-webkit-scrollbar {
                width: 1px;
              }
              .custom-scroll::-webkit-scrollbar-track {
                background: transparent;
              }
              .custom-scroll::-webkit-scrollbar-thumb {
                background-color: #e2e8f0;
                border-radius: 2px;
              }
            `,
              }}
            />

            <div className="custom-scroll space-y-3">
              {options?.map((option) => (
                <CheckboxFilterItem
                  key={option.id}
                  id={`${id}-${option.id}`}
                  label={option.name}
                  count={option.product_count}
                  checked={selectedValues.includes(option.id)}
                  onChange={(checked) => onChange(option.id, checked)}
                />
              ))}
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
