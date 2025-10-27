"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useForm, useFieldArray, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Switch } from "@/components/ui/switch";
import { purchaseFormSchema } from "@/schemas/inventory/purchase-schema";
import * as z from "zod";

import useFetchData from "@/hooks/use-fetch-data";
import SingleImageUploader from "@/components/common/ImageUploader/single-image-uploader";
import { purchaseAdd } from "@/lib/api/inventory/inventory-apis";
import { toast } from "sonner";
import VariantAttributeDisplay from "../../products/add-products/components/variant-attribute-display";
import AttributeModal from "../../products/add-products/components/attribute-modal";
import SingleFileUploader from "@/components/common/ImageUploader/file-uploader";
import { useRouter } from "next/navigation";
import { PaginatedSelect } from "@/components/common/paginated-select/paginated-select";
import { getProductsDropdown } from "@/lib/api/dropdown/dropdown-api";
import { Spinner } from "@/components/ui/spinner";

interface ProductOption {
  id: number;
  name: string;
  slug_name: string;
  image: string | null;
}

interface PurchaseInventoryFormProps {
  productOptions: ProductOption[];
}

const multiProductSchema = z.object({
  products: z.array(purchaseFormSchema),
  attachments: z.any().optional(),
});

export type MultiProductFormValues = z.infer<typeof multiProductSchema>;

const ProductForm: React.FC<{
  index: number;
  productOptions: ProductOption[];
  onRemove: () => void;
  showRemove: boolean;
}> = ({ index, onRemove, showRemove }) => {
  const form = useFormContext<MultiProductFormValues>();
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
  const [currentVariantIndex, setCurrentVariantIndex] = useState<number | null>(
    null
  );
  const [showVariantManagement, setShowVariantManagement] = useState(false);
  const [selectedProductSlug, setSelectedProductSlug] = useState<string | null>(
    null
  );
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    if (selectedProductSlug) {
      console.log('inside here',);

      // setSelectedProductSlug("")
      setUrl(`/products/${selectedProductSlug}/`);
    } else {
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

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `products.${index}.variantItems`,
  });

  const sameAsParentName = form.watch(`products.${index}.sameAsParentName`);
  const attributePrice = form.watch(`products.${index}.attributePrice`);
  const attributeImage = form.watch(`products.${index}.attributeImage`);
  const isVariantAdded = form.watch(`products.${index}.variantItems`)

  const addVariant = () => {
    setShowVariantManagement(true);
    append({
      name: "",
      price: 0,
      quantity: 0,
      image: null,
      variant_classes: [],
    });
  };

  const handleDeleteAttribute = (
    variantIndex: number,
    attributeIndex: number
  ) => {
    const variantClasses = form.getValues(
      `products.${index}.variantItems.${variantIndex}.variant_classes`
    );
    if (variantClasses) {
      form.setValue(
        `products.${index}.variantItems.${variantIndex}.variant_classes`,
        variantClasses.filter((_, i) => i !== attributeIndex)
      );
    }
  };

  const handleAttributeSave = (data: {
    attribute: string;
    attribute_variant: string;
    attribute_name: string;
    variant_name: string;
  }) => {
    if (currentVariantIndex !== null) {
      const currentClasses =
        form.getValues(
          `products.${index}.variantItems.${currentVariantIndex}.variant_classes`
        ) || [];
      form.setValue(
        `products.${index}.variantItems.${currentVariantIndex}.variant_classes`,
        [...currentClasses, data]
      );
    }
    setIsAttributeModalOpen(false);
    setCurrentVariantIndex(null);
  };
  return (
    <Card className="relative">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Product {index + 1}</CardTitle>
        {showRemove && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onRemove}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">
            SELECT PRODUCT
          </h3>
          <div className="flex flex-wrap gap-4">
            <div className="md:w-1/2 w-full">
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
                        }
                        }
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
            <Button type="button" onClick={addVariant}>
              <Plus className="h-4 w-4" />
              Add Variant
            </Button>
          </div>
        </div>

        {showVariantManagement && (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-6">
              <FormField
                control={form.control}
                name={`products.${index}.sameAsParentName`}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3">
                    <FormLabel className="text-sm font-medium">
                      SAME AS PARENT NAME
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-primary"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`products.${index}.attributePrice`}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3">
                    <FormLabel className="text-sm font-medium">
                      ATTRIBUTE PRICE
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-primary"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`products.${index}.attributeDiscount`}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3">
                    <FormLabel className="text-sm font-medium">
                      ATTRIBUTE DISCOUNT
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-primary"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`products.${index}.attributeImage`}
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-3">
                    <FormLabel className="text-sm font-medium">
                      ATTRIBUTE IMAGE
                    </FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="data-[state=checked]:bg-primary"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            {fields.length > 0 &&
              fields.map((field, variantIndex) => (
                <section
                  key={field.id}
                  className="space-y-4 border p-4 relative rounded-lg"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <FormField
                      control={form.control}
                      name={`products.${index}.variantItems.${variantIndex}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ITEM NAME</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Please Enter the Name"
                              {...field}
                              disabled={sameAsParentName}
                              className={sameAsParentName ? "bg-gray-100" : ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`products.${index}.variantItems.${variantIndex}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ITEM PRICE</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="Please Enter the Price"
                              value={field.value ?? ""}
                              min={1}
                              onChange={(e) => {
                                const val = e.target.valueAsNumber;
                                field.onChange(val > 0 ? val : "");
                              }}
                              disabled={attributePrice}
                              className={attributePrice ? "bg-gray-100" : ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`products.${index}.variantItems.${variantIndex}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ITEM QUANTITY</FormLabel>
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

                  {/* Conditional Image Field */}
                  {attributeImage && (
                    <div className="mt-4">
                      <FormField
                        control={form.control}
                        name={`products.${index}.variantItems.${variantIndex}.image`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              ITEM IMAGE
                              <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                              <SingleImageUploader
                                onChange={field.onChange}
                                onRemove={() => field.onChange(null)}
                                value={field.value || undefined}
                                size="small"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  <div className="absolute right-4 top-1">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="bg-red-500 text-white hover:bg-red-600 cursor-pointer hover:text-white"
                      onClick={() => {
                        remove(variantIndex);
                        if (fields.length === 1) {
                          setShowVariantManagement(false);
                        }

                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div>
                    <Button
                      type="button"
                      onClick={() => {
                        setCurrentVariantIndex(variantIndex);
                        setIsAttributeModalOpen(true);
                      }}
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Attribute
                    </Button>
                  </div>

                  <VariantAttributeDisplay
                    attributes={
                      form.watch(
                        `products.${index}.variantItems.${variantIndex}.variant_classes`
                      ) || []
                    }
                    onDelete={(attributeIndex) =>
                      handleDeleteAttribute(variantIndex, attributeIndex)
                    }
                  />
                </section>
              ))}
          </div>
        )}

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
                              placeholder="Enter quantity"
                              value={field.value ?? ""} // if null/undefined -> empty
                              onChange={(e) => {
                                const value = Number(e.target.value);

                                if (!e.target.value || value <= 0) {
                                  field.onChange(null); // set to null if empty or 0
                                } else {
                                  field.onChange(value); // set positive number
                                }
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
          <>
            {
              isVariantAdded?.length === 0 &&
              <FormField
                control={form.control}
                name={`products.${index}.quantity`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>QUANTITY</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Quantity"
                        {...field}
                        className="w-[200px]"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            }
          </>
        )}
        <AttributeModal
          isOpen={isAttributeModalOpen}
          onClose={() => {
            setIsAttributeModalOpen(false);
            setCurrentVariantIndex(null);
          }}
          onSave={handleAttributeSave}
        />
      </CardContent>
    </Card>
  );
};

const PurchaseInventoryForm: React.FC<PurchaseInventoryFormProps> = ({
  productOptions,
}) => {
  const form = useForm<MultiProductFormValues>({
    resolver: zodResolver(multiProductSchema),
    defaultValues: {
      products: [
        {
          product: "",
          sameAsParentName: false,
          attributeDiscount: false,
          attributePrice: false,
          attributeImage: false,
          variantItems: [],
          existing_variants: [],
          attachments: [],
          quantity: 0,
        },
      ],
      attachments: [],
    },
  });
  const [loading, setLoading] = useState(false);
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "products",
  });

  const addMoreProduct = () => {
    append({
      product: "",
      sameAsParentName: false,
      attributeDiscount: false,
      attributePrice: false,
      attributeImage: false,
      variantItems: [],
      existing_variants: [],
      quantity: 0,
      attachments: [],
    });
  };
  const router = useRouter()
  const onSubmit = async (data: MultiProductFormValues) => {
    // console.log("this is data", data);
setLoading(true)
    const formData = new FormData();

    data.products.forEach((prod, index) => {
      formData.append(`product[${index}]`, String(prod.product));

      formData.append(
        `sameAsParentName[${index}]`,
        String(prod.sameAsParentName ?? false)
      );
      formData.append(
        `attributePrice[${index}]`,
        String(prod.attributePrice ?? false)
      );
      formData.append(
        `attributeDiscount[${index}]`,
        String(prod.attributeDiscount ?? false)
      );
      formData.append(
        `attributeImage[${index}]`,
        String(prod.attributeImage ?? false)
      );

      if (prod.quantity !== undefined) {
        formData.append(
          `quantity[${index}]`,
          String(prod.quantity)
        );
      }

      prod.existing_variants?.forEach((variant, vIndex) => {
        formData.append(
          `existing_variants[${index}][${vIndex}][id]`,
          String(variant.id)
        );
        if (variant.quantity !== undefined) {
          formData.append(
            `existing_variants[${index}][${vIndex}][quantity]`,
            String(variant.quantity)
          );
        }
      });

      prod.variantItems?.forEach((variant, vIndex) => {
        formData.append(
          `variants[${index}][${vIndex}][item_name]`,
          variant.name ?? ""
        );
        if (variant.price !== undefined) {
          formData.append(
            `variants[${index}][${vIndex}][item_price]`,
            String(variant.price)
          );
        }
        formData.append(
          `variants[${index}][${vIndex}][item_quantity]`,
          String(variant.quantity)
        );

        if (variant.image) {
          formData.append(
            `variants[${index}][${vIndex}][image]`,
            variant.image as File
          );
        }

        variant.variant_classes.forEach((vc, vcIndex) => {
          formData.append(
            `variants[${index}][${vIndex}][variant_classes][${vcIndex}][attribute]`,
            vc.attribute
          );
          formData.append(
            `variants[${index}][${vIndex}][variant_classes][${vcIndex}][attribute_variant]`,
            vc.attribute_variant
          );
        });
      });

      formData.append(`attachment[${index}]`, data.attachments[0]);
    });

    try {
      await purchaseAdd(formData);
      toast.success(`Purchase added successfully!`);
      router.push("/dashboard/inventory");
    } catch (error: any) {
      toast.error(`Error submitting form: ${error?.message}`);
    } finally {
      setLoading(false)
    }
  };


  return (
    <div className=" rounded-xl min-h-screen">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (errors: any) => {
            console.error("Form errors:", errors);
            toast.error("Please check the form for errors");
          })}
        >

          <div className="flex flex-col gap-1 pb-32">
            <div className="space-y-6 ">
              {fields.map((field, index) => (
                <ProductForm
                  key={field.id}
                  index={index}
                  productOptions={productOptions}
                  onRemove={() => remove(index)}
                  showRemove={fields.length > 1}
                />
              ))}
            </div>
            <div className="flex m-4">
              <Button type="button" onClick={addMoreProduct}>
                <Plus className="h-4 w-4 z-50" />
                Add More Product
              </Button>
            </div>
          </div>

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
                  className="text-white font-semibold px-8 py-3 rounded-lg transition-colors"
                  disabled={loading}
                >
                  {loading ? <Spinner /> : "Save" }
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
