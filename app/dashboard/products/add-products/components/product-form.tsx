"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { CalendarIcon, Plus, X } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import {
  type ProductFormValues,
  productSchema,
} from "@/schemas/menu/products/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import TextEditor from "@/components/common/text-editor/text-editor";
import AttributeModal from "./attribute-modal";
import { handleError } from "@/lib/error-handler";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hooks";
import { createProduct, updateProduct } from "@/lib/api/menu/products-api";
import { toggleRefetchTableData } from "@/redux/features/table-slice";
import MultiImageUploader, {
  FileWithMetadata,
} from "@/components/common/ImageUploader/multi-image-uploader";

import SingleImageUploader from "@/components/common/ImageUploader/single-image-uploader";
import useFetchDropdown from "@/hooks/use-fetch-dropdown";
import { ICategoryDropdown } from "@/types/dropdown";
import { FormCombobox } from "@/components/common/form/form-combobox";
import { useRouter } from "next/navigation";
import { PaginatedSelect } from "@/components/common/paginated-select/paginated-select";
import {
  getBrandsDropdown,
  getInventoryLocationDropdown,
  getProductsDropdown,
  getTaxesDropdown,
} from "@/lib/api/dropdown/dropdown-api";

import VariantAttributeDisplay from "./variant-attribute-display";
import { IDashboardProduct } from "@/types/product";
import { formatDateForInput } from "@/lib/date-time-utils";
import ButtonLoader from "@/components/common/loader/button-loader";
import PaginatedProductSelect from "@/components/common/paginated-select/paginated-product-select";
import api from "@/services/api-instance";
import { setSelectedData } from "@/redux/features/authentication-slice";

interface ProductFormProps {
  initialData: IDashboardProduct | null;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const dispatch = useAppDispatch();

  const { data: categories } = useFetchDropdown<ICategoryDropdown>(
    "/categoriesdropdown/"
  );

  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
  const [convertedFiles, setConvertedFiles] = useState<FileWithMetadata[]>([]);
  const [currentVariantIndex, setCurrentVariantIndex] = useState<number | null>(
    null
  );

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      sku: "",
      productGeneralDescription: "",
      productDetailedDescription: "",
      category: "",
      sub_category: "",
      brand: "",
      price: "",
      discount: "",
      activateFlashSales: false,
      package: [],
      selectInventory: "",
      sameAsParentName: false,
      flashSalesEndDate: new Date(),
      attributePrice: false,
      attributeDiscount: false,
      attributeImage: false,
      variantItems: [],
      published: true,
      featured: false,
      new: false,
      is_best_seller: false,
      taxApplicable: false,
      productTutorialDescription: "",
      youtubeUrl: "",
      images: [],
    },
  });

  const { fields, remove, append, replace } = useFieldArray({
    control: form.control,
    name: "variantItems",
  });

  const sameAsParentName = form.watch("sameAsParentName");
  const attributePrice = form.watch("attributePrice");
  const attributeImage = form.watch("attributeImage");
  const productName = form.watch("productName");
  const price = form.watch("price");

  useEffect(() => {
    if (initialData) {
      const urls =
        initialData?.images?.map((item) => ({
          file: item?.file,
          id: item?.id,
        })) || [];

      setConvertedFiles(urls);

      const variantItems =
        initialData.variants?.map((variant) => {
          // console.log(variant);
          return {
            name: variant.item_name || "",
            price: variant.item_price || "",
            quantity: Number(variant.item_quantity) || 0,
            sku: variant?.sku || "",
            image: variant?.item_image || "",
            variant_classes:
              variant.product_variants?.map((variantClass) => ({
                attribute: variantClass.attribute?.id?.toString() || "",
                attribute_variant:
                  variantClass.attribute_variant?.id?.toString() || "",
                attribute_name: variantClass.attribute?.name || "",
                variant_name: variantClass.attribute_variant?.name || "",
              })) || [],
          };
        }) || [];

      const formData = {
        productName: initialData.name || "",
        sku: initialData.sku || "",
        productGeneralDescription: initialData.general_description || "",
        quantity: initialData.quantity || 0,
        productDetailedDescription: initialData.detail_description || "",
        category: initialData.category?.id.toString() || "",
        sub_category: initialData?.subcategory?.id.toString() || "",
        brand: initialData.brand?.id.toString() || "",
        price: initialData.price || "",
        discount: initialData.discount_percentage || "",
        flashSalesEndDate: new Date(initialData.flash_end_date) || new Date(),
        activateFlashSales: initialData.is_flash_sale || false,
        flashSalesDiscount: initialData.flash_sale_discount || "",
        images: urls,
        variantItems: variantItems,
        published: initialData.is_published || false,
        featured: initialData.is_Featured || false,
        new: initialData.is_new || false,
        is_best_seller: initialData.is_best_seller || false,
        taxApplicable: initialData.is_tax_applicable || false,
        productTutorialDescription: initialData.tutorial || "",
        youtubeUrl: initialData.youtube_link || "",
        package: initialData.package || [],
        selectInventory: initialData?.inventory?.id.toString() || "",
        sameAsParentName: initialData?.same_as_parent_name || false,
        attributePrice: initialData?.attribute_price || false,
        attributeDiscount: initialData?.attribute_discount || false,
        attributeImage: initialData?.variants?.some(
          (v) => v.item_image !== null && v.item_image !== ""
        )
          ? true
          : false,

        taxType: initialData?.tax_applied?.id.toString() || "",
      };

      form.reset(formData);

      if (variantItems.length > 0) {
        replace(variantItems);
      }
    }
  }, [initialData, form, replace]);

  useEffect(() => {
    if (fields.length > 0) {
      const currentItems = form.getValues("variantItems") || [];
      const updatedItems = currentItems.map((item) => ({
        ...item,
        name: sameAsParentName ? productName : item.name,
        price: attributePrice ? price : item.price,
      }));

      const hasChanges = currentItems.some(
        (item, index) =>
          item.name !== updatedItems[index]?.name ||
          item.price !== updatedItems[index]?.price
      );

      if (hasChanges) {
        form.setValue("variantItems", updatedItems);
      }
    }
  }, [
    sameAsParentName,
    attributePrice,
    productName,
    price,
    form,
    fields.length,
  ]);

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      const formData = new FormData();

      convertedFiles.forEach((fileData, index) => {
        if (fileData.file instanceof File) {
          formData.append(`images[${index}][file]`, fileData.file);
          formData.append(`images[${index}][file_type]`, "image");
        }
      });

      formData.append("name", data.productName);
      formData.append("sku", data.sku);
      formData.append("general_description", data.productGeneralDescription);
      formData.append("quantity", data.quantity.toString());
      formData.append("detail_description", data.productDetailedDescription);
      formData.append("price", data.price);

      if (data.discount) {
        formData.append("discount_percentage", data.discount);
      }

      formData.append("category", data.category);

      if (data.sub_category) {
        formData.append("subcategory", data.sub_category);
      }
      if (data.brand) {
        formData.append("brand", data.brand);
      }

      if (data.flashSalesEndDate) {
        formData.append(
          "flash_end_date",
          formatDateForInput(new Date(data.flashSalesEndDate.toISOString()))
        );
      }

      formData.append("flash_sale_discount", data.flashSalesDiscount || "");
      formData.append("is_flash_sale", data.activateFlashSales.toString());
      data.package?.forEach((item, index) => {
        formData.append(`package[${index}][id]`, item.id.toString());
        formData.append(`package[${index}][name]`, item.name);
      });
      formData.append("inventory", data.selectInventory ?? "");
      if (data.variantItems && data.variantItems.length > 0) {
        formData.append(
          "same_as_parent_name",
          data.sameAsParentName.toString()
        );
        formData.append("attribute_price", data.attributePrice.toString());
        formData.append(
          "attribute_discount",
          data.attributeDiscount.toString()
        );
        formData.append("attribute_image", data.attributeImage.toString());

        data.variantItems.forEach((item, index) => {
          if (item.name)
            formData.append(`variants[${index}][item_name]`, item.name);
          if (item.price)
            formData.append(`variants[${index}][item_price]`, item.price);
          formData.append(
            `variants[${index}][item_quantity]`,
            item.quantity.toString()
          );

          if (item.image && item.image instanceof File) {
            formData.append(`variants[${index}][item_image]`, item.image);
          }

          if (item.variant_classes) {
            item.variant_classes.forEach((variantClass, classIndex) => {
              formData.append(
                `variants[${index}][variant_classes][${classIndex}][attribute]`,
                variantClass.attribute
              );
              formData.append(
                `variants[${index}][variant_classes][${classIndex}][attribute_variant]`,
                variantClass.attribute_variant
              );
            });
          }
        });
      }

      formData.append("youtube_link", data.youtubeUrl ?? "");
      formData.append("tutorial", data.productTutorialDescription ?? "");
      formData.append("is_published", data.published.toString());
      formData.append("is_Featured", data.featured.toString());
      formData.append("is_new", data.new.toString());
      formData.append("is_best_seller", data.is_best_seller.toString());
      formData.append("is_tax_applicable", data.taxApplicable.toString());
      if (data.taxType) {
        formData.append("tax_applied", data.taxType);
      }

      if (initialData) {
        const response = await updateProduct(initialData.slug_name, formData);
        if (response.status === 200) {
          toast.success("Product updated successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/products");
        }
      } else {
        const response = await createProduct(formData);
        if (response.status === 201) {
          toast.success("Product created successfully");
          dispatch(toggleRefetchTableData());
          router.push("/dashboard/products");
        }
      }
    } catch (error) {
      handleError(error, toast);
    } finally {
      setLoading(false);
    }
  };

  const addVariant = () => {
    const newItem = {
      name: sameAsParentName ? productName : "",
      price: attributePrice ? price : "",
      quantity: 0,
      sku: "",
      image: attributeImage ? undefined : "",
      variant_classes: [],
    };
    append(newItem);
  };

  const handleSaveAttribute = (attributeData: {
    attribute: string;
    attribute_variant: string;
    attribute_name: string;
    variant_name: string;
  }) => {
    if (currentVariantIndex !== null) {
      const currentItems = form.getValues("variantItems") || [];
      const updatedItems = [...currentItems];
      if (!updatedItems[currentVariantIndex].variant_classes) {
        updatedItems[currentVariantIndex].variant_classes = [];
      }
      updatedItems[currentVariantIndex].variant_classes!.push(attributeData);
      form.setValue("variantItems", updatedItems);
    }
  };

  const handleDeleteAttribute = (
    variantIndex: number,
    attributeIndex: number
  ) => {
    const currentItems = form.getValues("variantItems") || [];
    const updatedItems = [...currentItems];
    updatedItems[variantIndex]?.variant_classes?.splice(attributeIndex, 1);
    form.setValue("variantItems", updatedItems);
  };

  useEffect(() => {
    if (initialData?.subcategory && categories?.length > 0) {
      const categoryWithSubcategory = categories.find((category) =>
        category.subcategories?.some(
          (sub) => sub.id.toString() === initialData.subcategory?.id.toString()
        )
      );

      if (categoryWithSubcategory) {
        form.setValue("category", categoryWithSubcategory.id.toString());

        form.setValue("sub_category", initialData.subcategory.id.toString());
      }
    }
  }, [categories, initialData, form]);
  const [Error, setError] = useState<string>();
  const handlevError = (err: any) => {
    if (err.variantItems) {
      setError(err.variantItems?.root?.message);
    }
  };
  return (
    <div className=" space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (err) => handlevError(err))}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product General Information */}
            <Card>
              <CardHeader>
                <CardTitle>Product General Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        PRODUCT NAME
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the Name of the product"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`quantity`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        PRODUCT QUANTITY
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Enter the Quantity"
                          value={field.value ?? ""}
                          min={1} // prevents typing values < 1
                          onChange={(e) => {
                            const val = e.target.valueAsNumber;
                            field.onChange(val > 0 ? val : ""); // only allow positive values
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        PRODUCT SKU
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter the sku of the product"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productGeneralDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        PRODUCT GENERAL DESCRIPTION
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <TextEditor
                          heightClass="!max-w-[300px]"
                          value={field.value || ""}
                          onChange={(value) => {
                            field.onChange(value);
                            form.trigger("productGeneralDescription");
                          }}
                          placeholder="Enter the Product Description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="productDetailedDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        PRODUCT DETAILED DESCRIPTION
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <TextEditor
                          heightClass="!max-w-[300px]"
                          value={field.value || ""}
                          onChange={(value) => {
                            field.onChange(value);
                            form.trigger("productDetailedDescription");
                          }}
                          placeholder="Enter the Product Detailed Description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <CardTitle className="py-4">Product Specific Info</CardTitle>
                <FormCombobox
                  form={form}
                  name="category"
                  label="Category "
                  placeholder="Select a category"
                  searchPlaceholder="Search Category..."
                  options={categories?.map((category) => ({
                    value: category.id.toString(),
                    label: category.name,
                  }))}
                  isRequired
                />

                <FormField
                  control={form.control}
                  name="sub_category"
                  render={({ field }) => {
                    const selectedCategory = form.watch("category");
                    const subCategories =
                      categories?.find(
                        (category) =>
                          category.id.toString() === selectedCategory
                      )?.subcategories || [];

                    return (
                      <FormItem>
                        <FormLabel className="">Sub Category</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value?.toString()}
                          defaultValue={field.value?.toString()}
                        >
                          <FormControl>
                            <SelectTrigger className="">
                              <SelectValue
                                defaultValue={field.value?.toString()}
                                placeholder="Select Sub Category"
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {subCategories.length > 0 ? (
                              subCategories.map((option) => {
                                return (
                                  <SelectItem
                                    key={option.id}
                                    value={
                                      option?.id ? option.id.toString() : ""
                                    }
                                  >
                                    {option.name}
                                  </SelectItem>
                                );
                              })
                            ) : (
                              <p className="text-sm px-4">
                                No Subcategories Found
                              </p>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="">Brand</FormLabel>
                      <FormControl>
                        <PaginatedSelect
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder={
                            initialData?.brand
                              ? initialData?.brand?.name
                              : "Select Brand"
                          }
                          fetchData={getBrandsDropdown}
                          className="w-full"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Pricing and Discount */}
            <Card>
              <CardHeader>
                <CardTitle>Pricing and Discount</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        PRICE
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1} // prevents typing values < 1
                          value={field.value || ""}
                          placeholder="Please enter the Discount Percentage"
                          onChange={(e) => {
                            const val = e.target.valueAsNumber;
                            field.onChange(val > 0 ? val.toString() : "");
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DISCOUNT %</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={1} // prevents typing values < 1
                          value={field.value || ""}
                          placeholder="Please enter the Discount Percentage"
                          onChange={(e) => {
                            const val = e.target.valueAsNumber;
                            field.onChange(
                              val > 0 && val < 100 ? val.toString() : ""
                            ); // only allow positive values
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="activateFlashSales"
                  render={({ field }) => (
                    <FormItem className="flex items-center justify-end gap-4">
                      <FormLabel>ACTIVATE FLASH SALES</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                {form.watch("activateFlashSales") && (
                  <>
                    <FormField
                      control={form.control}
                      name="flashSalesEndDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>FLASH SALES END DATE</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-full pl-3 text-left font-normal bg-white",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>
                                      Select the end date of flash sales
                                    </span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="flashSalesDiscount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>FLASH SALES DISCOUNT %</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={1} // prevents typing values < 1
                              max={100}
                              value={field.value || ""}
                              placeholder="Please enter the Discount Percentage"
                              onChange={(e) => {
                                const val = e.target.valueAsNumber;
                                field.onChange(
                                  val > 0 && val < 100 ? val.toString() : ""
                                ); // only allow positive values
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
                <CardTitle className="py-4">Bundle and Package</CardTitle>
                <FormField
                  control={form.control}
                  name="package"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SELECT PRODUCTS</FormLabel>

                      <FormControl>
                        <PaginatedProductSelect
                          selectedValues={field.value || []}
                          onSelectionChange={field.onChange}
                          title="Select Products"
                          fetchData={getProductsDropdown}
                          className="w-full "
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <CardTitle className="py-4">Others</CardTitle>
                <FormField
                  control={form.control}
                  name="selectInventory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        SELECT INVENTORY LOCATION
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <PaginatedSelect
                          value={field.value || ""}
                          onValueChange={field.onChange}
                          placeholder={
                            initialData?.inventory
                              ? initialData?.inventory?.name
                              : "Select Inventory Location"
                          }
                          fetchData={getInventoryLocationDropdown}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Variant Management */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-4">
                Variant Management{" "}
                <div className="size-6 flex items-center justify-center bg-primary text-white rounded-full">
                  <span className="text-xs">{fields.length}</span>
                </div>{" "}
              </CardTitle>
              <Button
                type="button"
                onClick={addVariant}
                className="bg-black rounded-3xl hover:bg-gray-500"
              >
                <Plus className="h-4 w-4" />
                Add Variant
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <FormField
                  control={form.control}
                  name="sameAsParentName"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormLabel>SAME AS PARENT NAME</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="attributePrice"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormLabel>ATTRIBUTE PRICE</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="attributeDiscount"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormLabel>ATTRIBUTE DISCOUNT</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="attributeImage"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormLabel>ATTRIBUTE IMAGE</FormLabel>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              {fields.length > 0 &&
                fields.map((field, index) => (
                  <section
                    key={field.id}
                    className="space-y-4 border p-4 relative"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
                      <FormField
                        control={form.control}
                        name={`variantItems.${index}.name`}
                        render={({ field }) => (
                          <FormItem className="">
                            <FormLabel>ITEM NAME</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Please Enter the Name"
                                {...field}
                                disabled={sameAsParentName}
                                className={
                                  sameAsParentName ? "bg-gray-100" : ""
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`variantItems.${index}.price`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ITEM PRICE</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Please Enter the Price"
                                {...field}
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
                        name={`variantItems.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ITEM QUANTITY</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter the Currency Rate"
                                value={field.value == 0 ? "" : field.value}
                                onChange={(e) =>
                                  field.onChange(
                                    parseInt(e.target.value) > 0
                                      ? Number(e.target.value)
                                      : undefined
                                  )
                                }
                                required
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {attributeImage && (
                        <div className="">
                          <FormField
                            control={form.control}
                            name={`variantItems.${index}.image`}
                            render={({ field }) => {
                              // console.log("this is the fields", field);
                              return (
                                <FormItem>
                                  <FormLabel>
                                    ITEM IMAGE
                                    <span className="text-red-500">*</span>
                                  </FormLabel>
                                  <FormControl>
                                    <SingleImageUploader
                                      onChange={field.onChange}
                                      onRemove={() => field.onChange(undefined)}
                                      value={field.value}
                                      size="small"
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              );
                            }}
                          />
                        </div>
                      )}
                    </div>

                    <div className="absolute right-4 top-1">
                      <div className=" flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="bg-red-500 text-white hover:bg-red-600 cursor-pointer hover:text-white"
                          onClick={() => remove(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-6 items-center">
                      <Button
                        type="button"
                        className="bg-black rounded-3xl hover:bg-gray-500 pr-4"
                        onClick={() => {
                          setCurrentVariantIndex(index);
                          setIsAttributeModalOpen(true);
                        }}
                      >
                        <Plus className="size-4" /> Add Attribute
                      </Button>
                      <VariantAttributeDisplay
                        attributes={
                          form.watch(`variantItems.${index}.variant_classes`) ||
                          []
                        }
                        onDelete={(attributeIndex) =>
                          handleDeleteAttribute(index, attributeIndex)
                        }
                      />
                    </div>
                    {Error && <span className="text-red">{Error}</span>}
                  </section>
                ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Photo Gallery */}
            <Card>
              <CardHeader>
                <CardTitle>
                  Photo Gallery
                  <span className="text-red-500">*</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultiImageUploader
                          isMultiple
                          onChange={field.onChange}
                          value={convertedFiles}
                          onRemove={async (updatedFiles) => {
                            const removedFiles = convertedFiles.filter(
                              (file) => !updatedFiles.includes(file)
                            );

                            for (const removed of removedFiles) {
                              if (removed.id) {
                                try {
                                  const newImages = initialData?.images?.filter(
                                    (img) => img.id !== removed.id
                                  );
                                  dispatch(
                                    setSelectedData({
                                      ...initialData,
                                      images: newImages,
                                    })
                                  );

                                  const response = await api.delete(
                                    `/delete-product-image/${removed.id}/`
                                  );
                                  if (response?.status === 200) {
                                    toast.success(
                                      `File with id ${removed.id} deleted`
                                    );
                                  }
                                } catch (error) {
                                  console.error(error);
                                  toast.error("Error deleting file:");
                                }
                              }
                            }

                            field.onChange(updatedFiles);
                          }}
                          setConvertedFile={setConvertedFiles}
                          isEdit={initialData !== null}
                          accept=".png,.jpg,.jpeg,.webp"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Publicity + Product Tutorial */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Publicity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="published"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel>PUBLISHED</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel>FEATURED</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="new"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel>NEW</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="is_best_seller"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel>BEST SELLER</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="taxApplicable"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel>TAX APPLICABLE</FormLabel>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  {form.watch("taxApplicable") && (
                    <FormField
                      control={form.control}
                      name="taxType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-muted-foreground">
                            TAX
                          </FormLabel>

                          <FormControl className="w-full rounded-xs cursor-pointer">
                            <PaginatedSelect
                              value={field.value}
                              onValueChange={field.onChange}
                              placeholder={
                                initialData?.tax_applied
                                  ? initialData?.tax_applied.name
                                  : "Select Tax Type"
                              }
                              fetchData={getTaxesDropdown}
                              className="w-full"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  <CardTitle className="py-4">Product specification</CardTitle>

                  <FormField
                    control={form.control}
                    name="productTutorialDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PRODUCT OR CASE DESCRIPTION</FormLabel>
                        <FormControl>
                          <TextEditor
                            value={field.value ?? ""}
                            onChange={field.onChange}
                            placeholder="Enter the Product Description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="youtubeUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>YOUTUBE URL LINK</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Share the URL of the youtube to embed the video"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" className="px-8" disabled={loading}>
              {loading ? <ButtonLoader /> : "Save Product"}
            </Button>
          </div>
        </form>
      </Form>

      <AttributeModal
        isOpen={isAttributeModalOpen}
        onClose={() => setIsAttributeModalOpen(false)}
        onSave={handleSaveAttribute}
      />
    </div>
  );
}