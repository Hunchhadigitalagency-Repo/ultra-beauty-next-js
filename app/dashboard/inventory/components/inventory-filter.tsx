"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCriteria } from "@/redux/features/filter-slice";
import useFetchDropdown from "@/hooks/use-fetch-dropdown";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider } from "react-hook-form";
import { ICategoryDropdown } from "@/types/dropdown";
import { ComboboxOption, FormCombobox } from "@/components/common/form/form-combobox";
import { SheetClose } from "@/components/ui/sheet";

interface IFormValues {
  category: string;
  action_type: string;
}

const InventoryFilter = () => {
  const dispatch = useAppDispatch();
  const { criteria } = useAppSelector((state) => state.filter);

  const form = useForm<IFormValues>({
    defaultValues: {
      category: "",
      action_type: "",
    },
  });

  // Fetch categories
  const { data: categories } = useFetchDropdown<ICategoryDropdown>("/categoriesdropdown/");

  // Action type options
  const actionTypeOptions: ComboboxOption[] = [
    { value: "purchase", label: "Purchase" },
    { value: "damage", label: "Damage" },
    { value: "purchase_return", label: "Purchase Return" },
  ];

  const handleApply = (values: IFormValues) => {
    dispatch(
      setCriteria({
        ...criteria,
        categories: values.category ? [Number(values.category)] : [],
        action_type: values.action_type,
      })
    );
  };

  const handleClear = () => {
    form.reset();
    dispatch(
      setCriteria({
        ...criteria,
        categories: [],
        action_type: "",
      })
    );
  };

  return (
    <FormProvider {...form}>
      <div className="space-y-4">
        <h4 className="font-medium text-sm">Filter Inventory</h4>

        {/* Category Combobox */}
        <FormCombobox
          form={form}
          name="category"
          label="Category"
          placeholder="Select a category"
          searchPlaceholder="Search Category..."
          options={categories?.map((category) => ({
            value: category.id.toString(),
            label: category.name,
          }))}
        />

        {/* Action Type Combobox */}
        <FormCombobox
          form={form}
          name="action_type"
          label="Action Type"
          placeholder="Select action type"
          options={actionTypeOptions}
        />

        <div className="flex gap-2">
          <SheetClose asChild>
            <Button onClick={() => handleApply(form.getValues())}>Apply Filter</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
          </SheetClose>
        </div>
      </div>
    </FormProvider>
  );
};

export default InventoryFilter;
