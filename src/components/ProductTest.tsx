"use client";

import { useGetProductsQuery } from "@/lib/features/api/ecommerceApi";

export default function ProductTest() {
  
  const { data: products = [], isLoading, isError } = useGetProductsQuery();

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="text-lg font-semibold">Loading products...</div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="rounded-lg border border-red-300 bg-red-50 px-6 py-4 text-red-600">
          Failed to load products.
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-8 text-center text-3xl font-bold">Product List</h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-2xl border bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-xl font-bold">
              {product.id}
            </div>

            <img
              src={product.images[0]}
              alt={product.title}
              className="h-48 w-full rounded-lg object-cover"
            />

            <h2 className="mb-3 text-lg font-semibold line-clamp-2">
              {product.title}
            </h2>

            <p className="mb-4 text-sm text-gray-600 line-clamp-3">
              {product.description}
            </p>

            {"price" in product && (
              <div className="mb-3 text-2xl font-bold text-green-600">
                ${product.price}
              </div>
            )}

            <button className="w-full rounded-lg bg-black px-4 py-2 text-white transition hover:opacity-90">
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
