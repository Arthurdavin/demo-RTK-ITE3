"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import z from "zod";

type ProductFormValues = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string;
};

const productShema = z.object({
  title:z.coerce.string().min(5,"title must be at least 5 charaters"),
  price:z.coerce.number().min(1,"price must be greater than zero"),
  categoryId:z.coerce.number(),
  description:z.coerce.string(),
  images: z.string(),
})

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormValues>({
    resolver:zodResolver(productShema) as any,
    defaultValues: {
      title: "",
      price: 0,
      description: "",
      categoryId: 1,
      images:"",
    },
  });

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    console.log(data);
    await new Promise((r) => setTimeout(r, 1000));
    reset();
  };

  // reusable input style
  const inputClass = `
  w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900
  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
  transition
`;

  const labelClass = "block mb-1 font-medium text-gray-900";

  const errorClass = "text-red-500 text-sm mt-1";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg bg-white shadow-lg rounded-2xl p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create Product
        </h2>

        {/* TITLE */}
        <div>
          <label className={labelClass}>Title</label>
          <input
            type="text"
            placeholder="Enter product title"
            className={inputClass}
            {...register("title", { required: "Title is required" })}
          />
          {errors.title && <p className={errorClass}>{errors.title.message}</p>}
        </div>

        {/* PRICE */}
        <div>
          <label className={labelClass}>Price</label>
          <input
            type="number"
            placeholder="Enter price"
            className={inputClass}
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true,
              min: { value: 0, message: "Price must be >= 0" },
            })}
          />
          {errors.price && <p className={errorClass}>{errors.price.message}</p>}
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className={labelClass}>Description</label>
          <textarea
            placeholder="Enter description"
            rows={4}
            className={inputClass}
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className={errorClass}>{errors.description.message}</p>
          )}
        </div>

        {/* CATEGORY */}
        <div>
          <label className={labelClass}>Category ID</label>
          <input
            type="number"
            placeholder="Category ID"
            className={inputClass}
            {...register("categoryId", {
              required: "Category is required",
              valueAsNumber: true,
              min: { value: 1, message: "Invalid category" },
            })}
          />
          {errors.categoryId && (
            <p className={errorClass}>{errors.categoryId.message}</p>
          )}
        </div>

        {/* IMAGE */}
        <div>
          <label className={labelClass}>Image URL</label>
          <input
            type="text"
            placeholder="https://..."
            className={inputClass}
            {...register("images", {
              required: "Image URL is required",
            })}
          />
          {errors.images && (
            <p className={errorClass}>{errors.images.message}</p>
          )}
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
