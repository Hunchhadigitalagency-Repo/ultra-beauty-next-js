"use client";
import { useState, useEffect, useRef } from "react";
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
} from "@/lib/api/dropdown/dropdown-api";
import { PaginatedProductSelect } from "@/components/common/paginated-select/paginated-product-select";
import VariantAttributeDisplay from "./variant-attribute-display";
import { IProduct } from "@/types/product";

interface ProductFormProps {
  initialData: IProduct | null;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const dispatch = useAppDispatch();

  const { data: categories } = useFetchDropdown<ICategoryDropdown>(
    "/categoriesdropdown/"
  );

  const router = useRouter();

  const [isAttributeModalOpen, setIsAttributeModalOpen] = useState(false);
  const [convertedFiles, setConvertedFiles] = useState<FileWithMetadata[]>([]);
  const [currentVariantIndex, setCurrentVariantIndex] = useState<number | null>(
    null
  );
  const initialDataSetRef = useRef(false);

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
      slug: "",
      warehouse: "",
      sameAsParentName: false,
      attributePrice: false,
      attributeDiscount: false,
      attributeImage: false,
      variantItems: [],
      published: false,
      featured: false,
      hot: false,
      shopNow: false,
      taxApplicable: false,
      productTutorialDescription: "",
      youtubeUrl: "",
      images: [],
    },
  });

  const { fields, remove } = useFieldArray({
    control: form.control,
    name: "variantItems",
  });

  const sameAsParentName = form.watch("sameAsParentName");
  const attributePrice = form.watch("attributePrice");
  const attributeImage = form.watch("attributeImage");
  const productName = form.watch("productName");
  const price = form.watch("price");

  useEffect(() => {
    if (initialData && !initialDataSetRef.current) {
      initialDataSetRef.current = true;

      const urls =
        initialData?.images?.map((item) => ({
          file: item.file,
          id: item.id,
        })) || [];

      setConvertedFiles(urls);

      form.reset({
        productName: initialData.name || "",
        sku: initialData.sku || "",
        productGeneralDescription: initialData.general_description || "",
        productDetailedDescription: initialData.detail_description || "",
        category: initialData.category?.id.toString() || "",
        sub_category: initialData?.subcategory?.id.toString() || "",
        brand: initialData.brand?.toString() || "",
        price: initialData.price || "",
        discount: initialData.discount_percentage || "",
        activateFlashSales: initialData.is_flash_sale || false,
        flashSalesDiscount: initialData.flash_sale_discount || "",
        images: urls,
        variantItems:
          initialData.variants?.map((variant: any) => ({
            name: variant.item_name || "",
            price: variant.item_price || "",
            quantity: variant.item_quantity || "",
            sku: variant.sku || "",
            image: variant.item_image,
            variant_classes:
              variant.product_variants?.map((variantClass: any) => ({
                attribute: variantClass.attribute || "",
                attribute_variant: variantClass.attribute_variant || "",
                attribute_name: variantClass.attribute_name || "",
                variant_name: variantClass.variant_name || "",
              })) || [],
          })) || [],
        published: initialData.is_published || false,
        featured: initialData.is_Featured || false,
        hot: initialData.is_new || false,
        shopNow: initialData.is_must_sold || false,
        taxApplicable: initialData.is_tax_applicable || false,
        productTutorialDescription: initialData.tutorial || "",
        youtubeUrl: initialData.youtube_link || "",
        package: [],
        selectInventory: "",
        slug: initialData.slug_name || "",
        warehouse: "",
        sameAsParentName: false,
        attributePrice: false,
        attributeDiscount: false,
        attributeImage: false,
      });
    }
  }, [initialData, form]);

  useEffect(() => {
    const currentItems = form.getValues("variantItems");
    if (currentItems.length > 0) {
      const updatedItems = currentItems.map((item) => ({
        ...item,
        name: sameAsParentName ? productName : item.name,
        price: attributePrice ? price : item.price,
      }));

      const hasChanges = currentItems.some(
        (item, index) =>
          item.name !== updatedItems[index].name ||
          item.price !== updatedItems[index].price
      );

      if (hasChanges) {
        form.setValue("variantItems", updatedItems);
      }
    }
  }, [sameAsParentName, attributePrice, productName, price, form]);

  const onSubmit = async (data: ProductFormValues) => {
    try {
      const formData = new FormData();

      convertedFiles.forEach((fileData, index) => {
        if (fileData.file instanceof File) {
          if (index === 0) {
            formData.append("images[0][file]", fileData.file);
          }
          formData.append(`images[${index}][file]`, fileData.file);
          formData.append(`images[${index}][file_type]`, "image");
        }
      });

      formData.append("name", data.productName);
      formData.append("sku", data.sku);
      formData.append("general_description", data.productGeneralDescription);
      formData.append("detail_description", data.productDetailedDescription);
      formData.append("price", data.price);
      if (data.discount) {
        formData.append("discount_percentage", data.discount);
      }
      formData.append("category", data.category);
      if (data.sub_category) {
        formData.append("sub_category", data.sub_category);
      }

      formData.append("brand", data.brand);
      if (data.flashSalesEndDate) {
        formData.append("flash_end_date", data.flashSalesEndDate.toISOString());
      }
      formData.append("flash_sale_discount", data.flashSalesDiscount || "");
      formData.append("is_flash_sale", data.activateFlashSales.toString());
      data.package?.forEach((item, index) => {
        formData.append(`package[${index}]`, item);
      });
      formData.append("inventory", data.selectInventory ?? "");
      formData.append("slug", data.slug ?? "");
      formData.append("warehouse", data.warehouse ?? "");
      data.variantItems.forEach((item, index) => {
        formData.append(`variants[${index}][item_name]`, item.name);
        formData.append(`variants[${index}][item_price]`, item.price);
        formData.append(`variants[${index}][item_quantity]`, item.quantity);
        formData.append(`variants[${index}][sku]`, item.sku);
        if (item.image) {
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

      formData.append("youtube_link", data.youtubeUrl ?? "");
      formData.append("is_published", data.published.toString());
      formData.append("is_Featured", data.featured.toString());
      formData.append("hot", data.hot.toString());
      formData.append("shop_now", data.shopNow.toString());
      formData.append("is_tax_applicable", data.taxApplicable.toString());

      if (initialData) {
        const response = await updateProduct(initialData.id, formData);
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
    }
  };

  const addVariant = () => {
    // const parentName = form.getValues("productName");
    // const parentPrice = form.getValues("price");
    const currentItems = form.getValues("variantItems") || [];
    const newItem = {
      name: sameAsParentName ? productName : "",
      price: attributePrice ? price : "",
      quantity: "",
      sku: "",
      image: attributeImage ? undefined : "",
      variant_classes: [],
    };
    form.setValue("variantItems", [...currentItems, newItem]);
  };

  const handleSaveAttribute = (attributeData: {
    attribute: string;
    attribute_variant: string;
    attribute_name: string;
    variant_name: string;
  }) => {
    if (currentVariantIndex !== null) {
      const currentItems = form.getValues("variantItems");
      const updatedItems = [...currentItems];

      if (!updatedItems[currentVariantIndex].variant_classes) {
        updatedItems[currentVariantIndex].variant_classes = [];
      }

      updatedItems[currentVariantIndex].variant_classes.push(attributeData);
      form.setValue("variantItems", updatedItems);
    }
  };

  const handleDeleteAttribute = (
    variantIndex: number,
    attributeIndex: number
  ) => {
    const currentItems = form.getValues("variantItems");
    const updatedItems = [...currentItems];
    updatedItems[variantIndex]?.variant_classes?.splice(attributeIndex, 1);
    form.setValue("variantItems", updatedItems);
  };

  return (
    <div className=" space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                      <FormLabel>PRODUCT NAME</FormLabel>
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
                  name="sku"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PRODUCT SKU</FormLabel>
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
                      <FormLabel>PRODUCT GENERAL DESCRIPTION</FormLabel>
                      <FormControl>
                        <TextEditor
                          value={field.value}
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
                  name="productDetailedDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>PRODUCT DETAILED DESCRIPTION</FormLabel>
                      <FormControl>
                        <TextEditor
                          value={field.value}
                          onChange={field.onChange}
                          placeholder="Enter the Product Description"
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
                  label="Category"
                  placeholder="Select a category"
                  searchPlaceholder="Search Category..."
                  options={categories?.map((category) => ({
                    value: category.id.toString(),
                    label: category.name,
                  }))}
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
                        <FormLabel className="">
                          Sub Category
                          <span className="text-red-500">*</span>
                        </FormLabel>
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
                      <FormLabel className="">
                        Brand
                        <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <PaginatedSelect
                          value={field.value}
                          onValueChange={field.onChange}
                          placeholder="Select Brand"
                          fetchData={getBrandsDropdown}
                          className="w-full"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="warehouse"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>WAREHOUSE</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Here we will have slug"
                          {...field}
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
                      <FormLabel>PRICE</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please enter the product price"
                          {...field}
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
                          placeholder="Please enter the Discount Percentage"
                          {...field}
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
                                <span>Select the end date of flash sales</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
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
                          placeholder="Please enter the Discount Percentage"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                      <FormLabel>SELECT INVENTORY LOCATION</FormLabel>

                      <FormControl>
                        <PaginatedSelect
                          value={field.value || ""}
                          onValueChange={field.onChange}
                          placeholder="Select Inventory Location"
                          fetchData={getInventoryLocationDropdown}
                          className="w-full"
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SLUG</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Here we will have slug"
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

          {/* Variant Management */}
          <Card>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-4">
                Variant Management{" "}
                <div className="size-6 flex items-center justify-center bg-orange-500 text-white rounded-full">
                  <span className="text-xs">{fields.length}</span>
                </div>{" "}
              </CardTitle>
              <Button type="button" onClick={addVariant} className="">
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
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 items-center">
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
                        name={`variantItems.${index}.sku`}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ITEM SKU</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Please Enter the SKU"
                                {...field}
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
                                placeholder="Please Enter the Quantity"
                                {...field}
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
                          name={`variantItems.${index}.image`}
                          render={({ field }) => (
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
                          )}
                        />
                      </div>
                    )}

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
                    <div>
                      <Button
                        type="button"
                        onClick={() => {
                          setCurrentVariantIndex(index);
                          setIsAttributeModalOpen(true);
                        }}
                      >
                        <Plus className="size-4" /> Add Attribute
                      </Button>
                    </div>
                    <VariantAttributeDisplay
                      attributes={
                        form.watch(`variantItems.${index}.variant_classes`) ||
                        []
                      }
                      onDelete={(attributeIndex) =>
                        handleDeleteAttribute(index, attributeIndex)
                      }
                    />
                  </section>
                ))}
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Photo Gallery */}
            <Card>
              <CardHeader>
                <CardTitle>Photo Gallery</CardTitle>
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
                          onRemove={field.onChange}
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
                      name="hot"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel>HOT</FormLabel>
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
                      name="shopNow"
                      render={({ field }) => (
                        <FormItem className="flex items-center justify-between">
                          <FormLabel>SHOP NOW</FormLabel>
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
                  <CardTitle className="py-4">Product Tutorial</CardTitle>
                  <FormField
                    control={form.control}
                    name="productTutorialDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>PRODUCT OR CASE DESCRIPTION</FormLabel>
                        <FormControl>
                          <TextEditor
                            value={field.value}
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
            <Button type="submit" className=" px-8">
              Save Product
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
