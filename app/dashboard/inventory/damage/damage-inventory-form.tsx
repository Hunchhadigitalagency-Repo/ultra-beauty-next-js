"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import useFetchData from "@/hooks/use-fetch-data";
import { damageReturn } from "@/lib/api/inventory/inventory-apis";
import { toast } from "sonner";
import SingleFileUploader from "@/components/common/ImageUploader/file-uploader";
import {
  damageReturnFormSchema,
  damageReturnFormValues,
} from "@/schemas/inventory/damage-schema";
import { useRouter } from "next/navigation";
import { PaginatedSelect } from "@/components/common/paginated-select/paginated-select";
import { getProductsDropdown } from "@/lib/api/dropdown/dropdown-api";

interface ProductOption {
  id: number;
  name: string;
  slug_name: string;
  image: string | null;
}

interface ProductFormProps {
  index: number;
  productOptions: ProductOption[];
  form: any;
  onRemove: () => void;
  canRemove: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  index,
  form,
  onRemove,
  canRemove,
}) => {
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(
    null
  );
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (selectedProductSlug) {
      setUrl(`/products/${selectedProductSlug}/`);
    } else {
      setSelectedProductSlug(null)
      setUrl("");
    }
  }, [selectedProductSlug]);

  const { data: productData } = useFetchData<any>(url, false);

  useEffect(() => {
    if (productData?.variants?.length) {
      const variantsData = productData.variants.map((v: any) => ({
        id: Number(v.id),
        quantity: "",
      }));
      form.setValue(`products.${index}.existing_variants`, variantsData);
    }
  }, [productData, form, index]);

 

  return (
    <div className="bg-white p-4 rounded-xl shadow-sm w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {index === 0 ? "SELECT PRODUCT" : `PRODUCT ${index + 1}`}
        </h2>
        {canRemove && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onRemove}
            className="text-red-500 hover:text-red-700 hover:bg-red-50"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="mb-6">
        <div className="w-full md:w-4/5">
          <FormField
            control={form.control}
            name={`products.${index}.product`}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <PaginatedSelect
                    value={field.value}
                    onValueChange={(value, slug_name) => {
                      field.onChange(value);
                      setSelectedProductSlug(slug_name || "")
                    }}
                    placeholder="Select Product"
                    fetchData={getProductsDropdown}
                    className="w-full"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>

      {productData?.variants?.filter((v: any) => v.product_variants?.length > 0).length > 0 ? (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            EXISTING VARIANTS
          </h3>
          <div className="flex flex-wrap gap-4">
            {productData.variants
              .filter((v: any) => v.product_variants?.length > 0)
              .map((variant: any, variantIndex: number) => (
                <div key={variant.id} className="flex gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-600 block mb-1">
                      VARIATION
                    </label>
                    {variant.product_variants.map((vari: any, variIndex: number) => (
                      <div
                        key={variIndex}
                        className="text-[10px] border h-[20px] mt-1 text-black bg-gray-100 rounded-2xl w-[100px] p-1 flex justify-center items-center"
                      >
                        {vari?.attribute_variant?.name}
                      </div>
                    ))}
                  </div>
                  <FormField
                    control={form.control}
                    name={`products.${index}.existing_variants.${variantIndex}.quantity`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>QUANTITY</FormLabel>
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
              ))}
          </div>
        </div>
      ) : (
        <FormField
          control={form.control}
          name={`products.${index}.quantity`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>QUANTITY</FormLabel>
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
                  className="w-[200px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}

    </div>
  );
};

interface PurchaseInventoryFormProps {
  productOptions: ProductOption[];
}

const PurchaseInventoryForm: React.FC<PurchaseInventoryFormProps> = ({
  productOptions,
}) => {
  const form = useForm<damageReturnFormValues>({
    resolver: zodResolver(damageReturnFormSchema),
    defaultValues: {
      products: [
        {
          product: "",
          attributeImage: false,
          existing_variants: [],
          quantity: 0,
        },
      ],
      attachments: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const addMoreProduct = () => {
    append({
      product: "",
      attributeImage: false,
      existing_variants: [],
    });
  };

  const removeProduct = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };
  const router = useRouter()

  const onSubmit = async (data: damageReturnFormValues) => {
    const formData = new FormData();

    data.products.forEach((prod, index) => {
      formData.append(`product[${index}]`, prod.product.toString());
      formData.append(`quantity[${index}]`, prod.quantity?.toString() || '');

      // if existing_variants is an array, loop it too
      prod?.existing_variants?.forEach((variant, vIndex) => {
        formData.append(`existing_variants[${index}][${vIndex}].id`, variant.id.toString());
        formData.append(`existing_variants[${index}][${vIndex}].quantity`, variant?.quantity?.toString() || '');
      });

      // if attachment is a file
      if (data.attachments) {
        formData.append(`attachment[${index}]`, data.attachments[0]);
      }
    });

    try {
      const response = await damageReturn(formData);
      toast.success(`Inventory Updated: ${response}`);
      router.push("/dashboard/inventory");
    } catch (error) {
      toast.error("Error updating inventory");
      console.error(error);
    }

  };

  return (
    <div className="min-h-screen ">
      <Form {...form}>
        <form
          className="relative flex flex-col gap-6 pb-32"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="space-y-2 relative">
            {fields.map((field, index) => (
              <ProductForm
                key={field.id}
                index={index}
                productOptions={productOptions}
                form={form}
                onRemove={() => removeProduct(index)}
                canRemove={fields.length > 1}
              />
            ))}

            <div className="flex m-4">
              <Button type="button" onClick={addMoreProduct}>
                <Plus className="h-4 w-4" />
                Add More Product
              </Button>
            </div>
          </div>

          <div className="h-32"></div>         
          <div className={`flex justify-end items-end  ${fields.length < 2 && "mt-10"} `}>
                   <div className="bg-white p-4 rounded-xl shadow-lg flex flex-col lg:items-start gap-4">
                     <div className="md:block text-sm font-medium text-gray-600 uppercase tracking-wide">
                       ATTACHMENT
                     </div>
       
                     <div className="flex gap-4 relative w-full">
                       <FormField
                         control={form.control}
                         name="attachments"
                         render={({ field }) => (
                           <FormItem>
                             <FormControl>
                               <div className="relative w-full">
                                 <Input
                                   placeholder="Select your Attachment"
                                   className="bg-white w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-500"
                                   readOnly
                                   value={field.value?.[0]?.name || ""}
                                 />
                                 <div className="absolute inset-0 opacity-0">
                                   <SingleFileUploader
                                     value={field.value?.[0] || undefined}
                                     onChange={(file) =>
                                       field.onChange(file ? [file] : [])
                                     }
                                     onRemove={() => field.onChange([])}
                                     fileType="*/*"
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
                         className=" text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                       >
                         Save
                       </Button>
                     </div>
       
                   </div>
                 </div>
        </form>
      </Form>
    </div>
  );
};

export default PurchaseInventoryForm;
