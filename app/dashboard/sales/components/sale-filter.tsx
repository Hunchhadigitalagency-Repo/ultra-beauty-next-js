"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setCriteria } from "@/redux/features/filter-slice";
import { Button } from "@/components/ui/button";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { SheetClose } from "@/components/ui/sheet";

interface IFormValues {
  dateRange: { from?: Date; to?: Date };
}

const SaleFilter = () => {
  const dispatch = useAppDispatch();
  const { criteria } = useAppSelector((state) => state.filter);

  const form = useForm({
    defaultValues: {
      dateRange: { from: undefined, to: undefined },
    },
  });

  const handleApply = (values: IFormValues) => {
    dispatch(
      setCriteria({
        ...criteria,
        start_date: values.dateRange.from
          ? format(values.dateRange.from, "yyyy-MM-dd")
          : undefined,
        end_date: values.dateRange.to
          ? format(values.dateRange.to, "yyyy-MM-dd")
          : undefined,
      })
    );
  };

  const handleClear = () => {
    form.reset();
    dispatch(
      setCriteria({
        ...criteria,
        start_date: undefined,
        end_date: undefined,
      })
    );
  };

  return (
    <FormProvider {...form}>
      <div className="space-y-4 p-4 rounded-lg">
        <h4 className="font-semibold text-lg text-gray-800">Filter Sales</h4>

        <Controller
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <Popover>
              <PopoverTrigger>
                <Button
                  variant="outline"
                  className="w-full justify-between flex items-center text-left"
                >
                  {field.value?.from && field.value?.to
                    ? `${format(field.value.from, "MM/dd/yyyy")} - ${format(
                        field.value.to,
                        "MM/dd/yyyy"
                      )}`
                    : "Select date range"}
                  <span className="ml-2">📅</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="range"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />

        <div className="flex gap-2">
          <SheetClose>
            <Button onClick={() => handleApply(form.getValues())} variant="default">
              Apply Filter
            </Button>
          </SheetClose>
          <SheetClose>
            <Button variant="outline" onClick={handleClear}>
              Clear
            </Button>
          </SheetClose>
        </div>
      </div>
    </FormProvider>
  );
};

export default SaleFilter;


