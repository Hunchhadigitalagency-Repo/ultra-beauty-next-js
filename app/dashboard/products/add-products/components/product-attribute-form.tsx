import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { ChevronRightIcon } from "lucide-react";
import { useAppDispatch } from "@/redux/hooks";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ProductAttributeFormValues,
  productAttributeSchema,
} from "@/schemas/menu/products/product-schema";
import { handleError } from "@/lib/error-handler";
import { toast } from "sonner";
import {
  createProductAttribute,
  updateProductAttribute,
} from "@/services/products/product-api";
import LoadingSpinner from "@/components/common/loader/loading-spinner";

interface ProductAttributeFormProps {
  initialData: any | null;
}

export default function ProductAttributeForm({
  initialData,
}: ProductAttributeFormProps) {
  const dispatch = useAppDispatch();

  console.log(dispatch);
  const themes = [
    { id: 1, name: "Red" },
    { id: 2, name: "Blue" },
  ];

  const [isLoading, setIsLoading] = useState(false);

  const title = initialData
    ? "Edit Product Attribute"
    : "New Product Attribute";

  const defaultValues = initialData
    ? {
        name: initialData?.name?.id?.toString(),
        value: initialData?.value,
      }
    : {
        name: "",
        value: "",
      };

  const form = useForm<ProductAttributeFormValues>({
    resolver: zodResolver(productAttributeSchema),
    defaultValues,
  });

  const onSubmit = async (data: ProductAttributeFormValues) => {
    setIsLoading(true);
    try {
      if (initialData) {
        const res = await updateProductAttribute(
          initialData.id as number,
          data
        );
        if (res.status === 200) {
          document.getElementById("closeDialog")?.click();
        }
      } else {
        const res = await createProductAttribute(data);
        if (res.status === 201) {
          document.getElementById("closeDialog")?.click();
        }
      }
    } catch (error: any) {
      handleError(error, toast);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="pb-4">
        <h1 className="text-2xl font-semibold leading-none tracking-tight text-textColor">
          {title}
        </h1>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">Attribute Name</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value?.toString()}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue
                        defaultValue={field.value?.toString()}
                        placeholder="Select Attribute Name"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {themes.map((option) => {
                      return (
                        <SelectItem
                          key={option.id}
                          value={option?.id ? option.id.toString() : ""}
                        >
                          {option.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="value"
            render={({ field }) => (
              <FormItem className="">
                <FormLabel className="">Attribute Value</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value?.toString()}
                  defaultValue={field.value?.toString()}
                >
                  <FormControl>
                    <SelectTrigger className="">
                      <SelectValue
                        defaultValue={field.value?.toString()}
                        placeholder="Select Attribute Value"
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {themes.map((option) => {
                      return (
                        <SelectItem
                          key={option.id}
                          value={option?.id ? option.id.toString() : ""}
                        >
                          {option.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-center">
            <Button>
              {isLoading ? (
                <LoadingSpinner containerClassName="h-full" />
              ) : (
                <>
                  Save <ChevronRightIcon size={18} />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
