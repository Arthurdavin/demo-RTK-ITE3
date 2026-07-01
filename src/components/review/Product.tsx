"use client"

import {
  useCreateProductMutation,
  useUploadFileMutation,
} from "@/lib/service/productApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

export interface CreateProductArgs {
  title: string;
  price: number;
  categoryId: number;
  description: string;
  image: string;
}

const productSchema = z.object({
  title: z.string().min(5, "title must be at least 5 characters"),
  price: z.number().min(1, "price must be greater than zero"),
  categoryId: z.number(),
  description: z.string(),
  file: z.instanceof(File, { message: "Image file is required" }),
});

type ProductFormInput = z.input<typeof productSchema>;
type ProductFormOutput = z.output<typeof productSchema>;

export function ProductForm() {
  const [uploadFile, { isLoading: isUploading }] = useUploadFileMutation();
  const [createProduct, { isLoading: isCreating, error }] =
    useCreateProductMutation();

  const {
    handleSubmit,
    control,
    register,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormInput, unknown, ProductFormOutput>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      price: 0,
      categoryId: 1,
      description: "",
    },
  });

  async function onSubmit(data: ProductFormOutput) {
    try {
      const uploaded = await uploadFile(data.file).unwrap();

      await createProduct({
        body: {
          title: data.title,
          price: data.price,
          categoryId: data.categoryId,
          description: data.description,
          image: uploaded.location,
        },
      }).unwrap();

      reset();
      console.log("Product created successfully");
    } catch (err) {
      console.log("Failed to create product", err);
    }
  }

  const isLoading = isSubmitting || isUploading || isCreating;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          {...register("title")}
          className="border px-2 py-2 rounded w-full"
        />
        {errors.title && (
          <p className="text-red-600 text-sm mt-2">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price</label>
        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <input
              type="number"
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
              className="border px-2 py-2 rounded w-full"
            />
          )}
        />
        {errors.price && (
          <p className="text-red-600 text-sm mt-2">{errors.price.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Category ID</label>
        <Controller
          name="categoryId"
          control={control}
          render={({ field }) => (
            <input
              type="number"
              value={field.value}
              onChange={(e) => field.onChange(Number(e.target.value))}
              className="border px-2 py-2 rounded w-full"
            />
          )}
        />
        {errors.categoryId && (
          <p className="text-red-600 text-sm mt-2">
            {errors.categoryId.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          {...register("description")}
          className="border px-2 py-2 rounded w-full"
        />
        {errors.description && (
          <p className="text-red-600 text-sm mt-2">
            {errors.description.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Image</label>
        <Controller
          name="file"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => {
                field.onChange(e.target.files?.[0]);
              }}
              className="border px-2 py-2 rounded w-full"
            />
          )}
        />
        {errors.file && (
          <p className="text-red-600 text-sm mt-2">{errors.file.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="bg-blue-500 text-white px-4 py-3 rounded disabled:opacity-50"
      >
        {isLoading ? "creating..." : "create product"}
      </button>

      {error && (
        <p className="text-red-600 text-sm">Failed to create product</p>
      )}
    </form>
  );
}
