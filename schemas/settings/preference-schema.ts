import { z } from "zod";

export const preferenceSchema = z.object({
  themeName: z.string().min(1, { message: "Theme name is required." }),
  activate: z.boolean(),
  colors: z.object({
    primary: z.string().min(1, { message: "Primary color required." }),
    secondary: z.string().min(1, { message: "Secondary color required." }),
    ternary: z.string().min(1, { message: "Ternary color required." }),
    forth: z.string().min(1, { message: "Forth color required." }),
    textPrimary: z.string().min(1, { message: "Text Primary required." }),
    textSecondary: z.string().min(1, { message: "Text Secondary  required." }),
    textMuted: z.string().min(1, { message: "Text Muted required." }),
    textParagraph: z.string().min(1, { message: "Text Paragraph  required." }),
  }),
});

export type PreferenceValues = z.infer<typeof preferenceSchema>;
