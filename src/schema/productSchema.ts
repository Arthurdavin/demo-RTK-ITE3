// schema/productSchema.ts
import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Title is required"),

  description: z.string().min(1, "Description is required"),

  price: z.coerce.number().positive("Price must be greater than 0"),

  categoryId: z.coerce.number().int().positive("Category ID must be greater than 0"),

  images: z.array(z.string().url("Invalid image URL")),
});

export type ProductForm = z.infer<typeof productSchema>;