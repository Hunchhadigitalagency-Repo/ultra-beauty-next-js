import { z } from "zod"

const MAX_FILE_SIZE = 10 * 1024 * 1024

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"]

const fileSchema = z.object({
  file: z.union([
    z.instanceof(File).superRefine((file, ctx) => {
      if (file.size > MAX_FILE_SIZE) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `File "${file.name}" size should be less than 10MB`,
        })
      }
      if (!ACCEPTED_TYPES.includes(file.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: `File "${file.name}" must be a valid image (jpeg, jpg, png, webp)`,
        })
      }
    }),
    z.string(),
  ]),
  id: z.number().optional(),
})

const variantClassSchema = z.object({
  attribute: z.string().min(1, "Attribute is required"),
  attribute_variant: z.string().min(1, "Attribute variant is required"),
  attribute_name: z.string().min(1, "Attribute name is required"),
  variant_name: z.string().min(1, "Variant name is required"),
})

const variantItemSchema = z.object({
  variantId:z.number().optional(),
  id: z.number().optional(),
  name: z.string().optional(),
  price: z.string().optional(),
  quantity: z.number().nonnegative("Quantity must be a positive number"),
  sku: z.string().optional(),
  image: z
    .union([
      z.instanceof(File).refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "File size must be less than 10MB",
      }),
      z.string(),
    ])
    .optional(),
  color: z.string().optional(),
  variant_classes: z.array(variantClassSchema).optional(),
})

export const paginatedSelectSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Name is required"),
})

export const productSchema = z
  .object({
    productName: z.string().min(1, "Product name is required"),
    sku: z.string().min(1, "SKU is required"),
    productGeneralDescription: z.string().min(1, "Product description is required"),
    productDetailedDescription: z.string().min(1, "Detailed description is required"),
    quantity: z.number().nonnegative("Quantity must be a positive number"),
    category: z.string().min(1, "Category is required"),
    sub_category: z.string().optional(),
    brand: z.string().optional(),
    price: z.string().min(1, "Price is required"),
    discount: z.string().optional(),
    activateFlashSales: z.boolean(),
    flashSalesEndDate: z.date().optional(),
    flashSalesDiscount: z.string().optional(),

    package: z.array(paginatedSelectSchema).optional(),

    selectInventory: z.string().min(1, "Inventory is location"),
    sameAsParentName: z.boolean(),
    attributePrice: z.boolean(),
    attributeDiscount: z.boolean(),
    attributeImage: z.boolean(),
    variantItems: z.array(variantItemSchema).optional(),

    published: z.boolean(),
    featured: z.boolean(),
    new: z.boolean(),
    is_best_seller: z.boolean(),
    taxApplicable: z.boolean(),
    taxType: z.string().optional(),
    productTutorialDescription: z.string().optional(),
    youtubeUrl: z.string().optional(),
    images: z.array(fileSchema).min(1, "At least one attachment is required"),
  })
  .refine(
    (data) => {
      if (data.attributeImage && data.variantItems && data.variantItems.length > 0) {
        return data.variantItems.every((item) => {
          return item.image && ((typeof item.image === "string" && item.image.length > 0) || item.image instanceof File)
        })
      }
      return true
    },
    {
      message: "All variant items must have images when attribute image is enabled",
      path: ["variantItems"],
    },
  )
  .refine(
    (data) => {
      if (data.variantItems && data.variantItems.length > 0) {
        return data.variantItems.every((item) => item.variant_classes && item.variant_classes.length > 0)
      }
      return true
    },
    {
      message: "Each variant must have at least one attribute",
      path: ["variantItems"],
    },
  )

export type ProductFormValues = z.infer<typeof productSchema>
export type VariantClass = z.infer<typeof variantClassSchema>
export type VariantItem = z.infer<typeof variantItemSchema>

export const productAttributeSchema = z.object({
  name: z.string().min(1, "Name is required"),
  value: z.string().min(1, "Value is required"),
})

export type ProductAttributeFormValues = z.infer<typeof productAttributeSchema>
