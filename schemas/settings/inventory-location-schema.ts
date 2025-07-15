import { z } from "zod";

export const inventoryLocationSchema = z.object({
  inventory_name: z.string().min(1, { message: "Inventory name is required." }),
  inventory_address: z
    .string()
    .min(1, { message: "Inventory address is required." }),
  latitude: z.number().min(-90).max(90, "Latitude must be between -90 and 90"),
  longitude: z.number().min(-180).max(180, "Longitude must be between -180 and 180"),
  is_active: z.boolean(),
})

export type InventoryLocationValues = z.infer<typeof inventoryLocationSchema>;
