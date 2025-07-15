import { z } from "zod";

export const apiSchema = z.object({
  apiName: z.string().min(1, { message: "API name is required." }),
  apiKey: z
    .array(
      z.object({
        value: z.string().min(1, "API key is required"),
      })
    )
    .min(1, { message: "At least one API key is required" }),
  activate: z.boolean(),
});

export type ApiValues = z.infer<typeof apiSchema>;
