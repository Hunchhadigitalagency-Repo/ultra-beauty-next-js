"use client";

import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useAppDispatch } from '@/redux/hooks';
import { CheckboxFilterItem } from "./checkbox-filter-item";
import { toggleCategory } from '@/redux/features/category-slice'
import { Category } from '@/types/product';

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
  categories?: Category[] | null
}

export function CheckboxFilter({
  id,
  title,
  options,
  selectedValues,
  onChange,
  categories
}: CheckboxFilterProps) {


  const dispatch = useAppDispatch()

  /* Get category id from url to check when there is dynamic value from route */
  const params = useParams();
  const categoryId = params?.id ? Number(params.id) : null;

  useEffect(() => {
    if (
      categoryId !== null && categories?.some(category => category.id === categoryId)
    ) {
      dispatch(toggleCategory({ id: categoryId, checked: true }));
    }
  }, [categoryId, categories, dispatch]);

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
