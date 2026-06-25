"use client";

import { useGetCategoriesQuery } from "@/redux/services/categoriesApi";

// import { useGetProductByIdQuery } from "@/lib/service/productApi";

export default function CategoryPage() {
  const { data, isLoading, isError, error } =
    useGetCategoriesQuery();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg font-semibold">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-500">
          Error: {JSON.stringify(error)}
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        No product found.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md rounded-lg border p-6 shadow-lg">
      {data?.map((category) => (
  <div
    key={category.id}
    className="mb-4 rounded border p-4"
  >
    <h2 className="font-bold">{category.name}</h2>
    <p>{category.slug}</p>

    <img
      src={category.image}
      alt={category.name}
      className="h-32 w-full object-cover"
    />
  </div>
))}
    </div>
  );
}