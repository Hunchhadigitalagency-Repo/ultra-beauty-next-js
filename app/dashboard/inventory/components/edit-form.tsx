"use client";
import type React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import useFetchData from "@/hooks/use-fetch-data";
import { updatedInventory } from "@/lib/api/inventory/inventory-apis";
import { toast } from "sonner";
import {
  EditInventoryFormValues,
  editInventorySchema,
} from "@/schemas/inventory/edit-inventory-shcema";
import SingleFileUploader from "@/components/common/ImageUploader/file-uploader";
import { useRouter } from "next/navigation";

interface EditInventoryFormProps {
  slug: string;
}

const EditInventoryForm: React.FC<EditInventoryFormProps> = ({ slug }) => {
  const { data: inventoryData, isLoading } = useFetchData<any>(
    `/inventory-management/${slug}/`,
    false
  );

  const action_type =
    inventoryData?.action?.toLowerCase() === "purchase return" ? 'purchase-return'
      : inventoryData?.action?.toLowerCase() === "purchase" ? 'purchase'
        : 'damage'

  const router = useRouter()
  const [attachment, setAttachment] = useState<File | undefined>(undefined);

  const form = useForm<EditInventoryFormValues>({
    resolver: zodResolver(editInventorySchema),
    defaultValues: {
      product: "",
      product_variant: "",
      quantity: 0,
      attachment: undefined,
    },
  });

  useEffect(() => {
    if (inventoryData) {
      form.reset({
        product: inventoryData.product?.id?.toString() || "",
        product_variant: inventoryData.product_variant?.id?.toString() || "",
        quantity: inventoryData?.quantity,
        attachment: undefined,
      });
    }
  }, [inventoryData, form]);

  const onSubmit = async (data: EditInventoryFormValues) => {
    try {
      const formData = new FormData();
      formData.append("product", data.product);
      if (data.product_variant) {
        formData.append("product_variant", data.product_variant);
      }

      if (data.quantity) {
        formData.append("quantity", data.quantity.toString());
      }

      if (data.attachment) {
        formData.append("attachment", data.attachment); // Send as a file, not array
      }



      await updatedInventory(slug, formData, action_type);
      toast.success("Updated inventory successfully!");
      router.push('/dashboard/inventory')
    } catch (error) {
      toast.error("Failed to update inventory");
      console.error("Error:", error);
    }
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6  rounded-xl">
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col bg-white p-6 rounded-xl shadow-sm gap-4">

            <div className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">Product</Label>
              <div className="p-3 bg-gray-50 rounded-md border">
                <div className="font-medium">{inventoryData?.product?.name}</div>
              </div>
            </div>

            <div className="flex gap-4">
              {inventoryData?.product_variant?.product_variants?.length > 0 && (
                <div className="space-y-2">
                  <Label className="text-xs font-medium text-gray-600 block mb-1">
                    VARIATION
                  </Label>
                  <div className="flex flex-col gap-2">
                    {inventoryData.product_variant.product_variants.map(
                      (vari: any, index: number) => (
                        <div
                          key={index}
                          className="text-[10px] border h-[20px] text-black bg-gray-100 rounded-2xl w-[100px] p-1 flex justify-center items-center"
                        >
                          {vari?.attribute_variant?.name}
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter the Quantity"
                        value={field.value ?? undefined}
                        min={1}
                        onChange={(e) => {
                          const val = e.target.valueAsNumber;
                          field.onChange(val > 0 ? val : "");
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className={`flex md:justify-end items-end  mt-60 `}>
            <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col md:items-start gap-4">
              <div className="md:block text-sm font-medium text-gray-600 uppercase tracking-wide">
                ATTACHMENT
              </div>

              <div className="flex relative gap-4">
                <FormField
                  control={form.control}
                  name="attachment"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative w-full">
                          <Input
                            placeholder="Select your Attachment"
                            className="bg-white w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-500"
                            readOnly
                            value={field.value?.name || ""}
                          />
                          <div className="absolute inset-0 opacity-0">
                            <SingleFileUploader
                              value={attachment}
                              onChange={(file: any) => {
                                setAttachment(file);
                                form.setValue("attachment", file ? file : undefined);
                              }}
                              onRemove={() => {
                                setAttachment(undefined);
                                form.setValue("attachment", undefined);
                              }}
                            />
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage className="text-sm text-red-500" />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  onClick={form.handleSubmit(onSubmit)}
                  className="bg-black hover:bg-gray-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                >
                  Save
                </Button>
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div >
  );
};

export default EditInventoryForm;
