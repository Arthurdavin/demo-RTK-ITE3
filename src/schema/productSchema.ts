// schema/productSchema.ts
import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),

  description: z.string().min(5, "Description is required"),

  price: z.coerce.number().positive("Price must be greater than 0"),

  categoryId: z.coerce
    .number()
    .int()
    .positive("Category ID must be greater than 0"),

  // images: z.array(z.string().url("Invalid image URL")),

  image: z
    .file()
    .min(1, "Please select an image")
    .max(10000 * 10000, "Image must be smaller than 1MB"),
});

export type ProductForm = z.infer<typeof productSchema>;