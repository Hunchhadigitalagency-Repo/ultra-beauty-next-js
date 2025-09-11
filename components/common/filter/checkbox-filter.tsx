"use client";

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
  product_count: number;
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
      <AccordionItem value={id}>
        <AccordionTrigger className="text-sm font-poppins font-medium text-foreground py-3">
          {title}
        </AccordionTrigger>
        <AccordionContent className="">
          <div className="space-y-3 h-28 overflow-y-auto">
            {options.map((option) => (
              <CheckboxFilterItem
                key={option.name}
                id={`${id}-${option.name}`}
                label={option.name}
                count={option.product_count}
                checked={selectedValues.includes(option.id)}
                onChange={(checked) => onChange(option.id, checked)}
              />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
