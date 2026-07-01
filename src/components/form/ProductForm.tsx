"use client";

import {
  useCreateProductMutation,
  useUploadFileMutation,
} from "@/lib/features/api/ProductApi";
import { productSchema } from "@/schema/productSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type ProductFormInput = z.input<typeof productSchema>;
type ProductFormOutput = z.output<typeof productSchema>;

export default function ProductForm() {
  const [uploadFile] = useUploadFileMutation();
  const [createProduct] = useCreateProductMutation();

  const {
    register,
    handleSubmit,
    control,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormInput, unknown, ProductFormOutput>({
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      categoryId: 1,
    },
  });

  const image = watch("image");

  async function onSubmit(data: ProductFormOutput) {
    try {
      // Upload image
      const uploaded = await uploadFile(data.image).unwrap();

      // Create Product
      await createProduct({
        ...data,
        images: [uploaded.location],
      }).unwrap();

      alert("Product created successfully!");
      reset();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  }

  const input = "w-full border rounded-lg px-3 py-2 text-gray-900";

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg space-y-5"
      >
        <h1 className="text-2xl font-bold text-center text-black">
          Create Product
        </h1>

        {/* Title */}
        <div>
          <label className="font-semibold text-black">Title</label>
          <input {...register("title")} className={input} />
          <p className="text-red-500">{errors.title?.message}</p>
        </div>

        {/* Price */}
        <div>
          <label className="font-semibold text-black">Price</label>
          <input type="number" {...register("price")} className={input} />
          <p className="text-red-500">{errors.price?.message}</p>
        </div>

        {/* Description */}
        <div>
          <label className="font-semibold text-black">Description</label>
          <textarea rows={4} {...register("description")} className={input} />
          <p className="text-red-500">{errors.description?.message}</p>
        </div>

        {/* Category */}
        <div>
          <label className="font-semibold text-black">Category ID</label>
          <input
            type="number"
            {...register("categoryId")}
            className={input}
          />
          <p className="text-red-500">{errors.categoryId?.message}</p>
        </div>

        {/* Image */}
        <div>
          <label className="font-semibold text-black">Product Image</label>
          <Controller
            name="image"
            control={control}
            render={({ field: { onChange, ref, name, onBlur } }) => (
              <input
                type="file"
                accept="image/*"
                className={input}
                name={name}
                ref={ref}
                onBlur={onBlur}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    onChange(file);
                  }
                }}
              />
            )}
          />
          <p className="text-red-500">{errors.image?.message as string}</p>

          {image instanceof File && (
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              className="mt-4 w-40 rounded-lg border"
            />
          )}
        </div>

        <button
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
        >
          {isSubmitting ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
