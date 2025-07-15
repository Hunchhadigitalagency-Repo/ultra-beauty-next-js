import { z } from "zod";

const MAX_FILE_SIZE = 1 * 1024 * 1024;

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const fileSchema = z.object({
  file: z.union([
    z
      .instanceof(File)
      .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "File size should be less than 1MB",
      })
      .refine((file) => ACCEPTED_TYPES.includes(file.type), {
        message: "Only Image files are allowed",
      }),
    z.string(),
  ]),
  id: z.number().optional(),
});

const variantClassSchema = z.object({
  attribute: z.string().min(1, "Attribute is required"),
  attribute_variant: z.string().min(1, "Attribute variant is required"),
  attribute_name: z.string().min(1, "Attribute name is required"),
  variant_name: z.string().min(1, "Variant name is required"),
});

const variantItemSchema = z.object({
  name: z.string().min(1, "Item name is required"),
  price: z.string().min(1, "Price is required"),
  quantity: z.string().min(1, "Quantity is required"),
  sku: z.string().min(1, "SKU is required"),
  image: z
    .union([
      z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "File size must be less than 1MB",
      }),
      z.string(),
    ])
    .optional(),
  color: z.string().optional(),
  variant_classes: z.array(variantClassSchema).optional(),
});

export const productSchema = z
  .object({
    productName: z.string().min(1, "Product name is required"),
    sku: z.string().min(1, "SKU is required"),
    productGeneralDescription: z
      .string()
      .min(1, "Product description is required"),
    productDetailedDescription: z
      .string()
      .min(1, "Detailed description is required"),

    category: z.string().min(1, "Category is required"),
    sub_category: z.string().optional(),
    brand: z.string().min(1, "Brand is required"),

    price: z.string().min(1, "Price is required"),
    discount: z.string().optional(),
    activateFlashSales: z.boolean(),
    flashSalesEndDate: z.date().optional(),
    flashSalesDiscount: z.string().optional(),

    package: z.array(z.string()).optional(),

    selectInventory: z.string().optional(),
    slug: z.string().optional(),
    warehouse: z.string().optional(),

    sameAsParentName: z.boolean(),
    attributePrice: z.boolean(),
    attributeDiscount: z.boolean(),
    attributeImage: z.boolean(),
    variantItems: z
      .array(variantItemSchema)
      .min(1, "At least one variant is required"),

    published: z.boolean(),
    featured: z.boolean(),
    hot: z.boolean(),
    shopNow: z.boolean(),
    taxApplicable: z.boolean(),

    productTutorialDescription: z
      .string()
      .min(1, "Product Tutorial Description is required"),
    youtubeUrl: z.string().optional(),
    images: z.array(fileSchema).min(1, "At least one attachment is required"),
  })
  .refine(
    (data) => {
      if (data.attributeImage && data.variantItems.length > 0) {
        return data.variantItems.every((item) => {
          return (
            item.image &&
            ((typeof item.image === "string" && item.image.length > 0) ||
              item.image instanceof File)
          );
        });
      }
      return true;
    },
    {
      message:
        "All variant items must have images when attribute image is enabled",
      path: ["variantItems"],
    }
  );

export type ProductFormValues = z.infer<typeof productSchema>;
export type VariantClass = z.infer<typeof variantClassSchema>;

export const productAttributeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  value: z.string().min(1, "Value is required"),
});

export type ProductAttributeFormValues = z.infer<typeof productAttributeSchema>;
