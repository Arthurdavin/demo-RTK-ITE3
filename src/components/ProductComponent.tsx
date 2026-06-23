"use client";

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchProducts } from "@/lib/features/product/productSlice";

export default function ProductComponent() {
  //   const dispatch = useAppDispatch();

  //   const { products, loading, error } = useAppSelector(
  //     (state) => state.products
  //   );

  //   useEffect(() => {
  //     dispatch(fetchProducts());
  //   }, [dispatch]);

  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products,
  );

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-2xl font-bold animate-pulse">
          Loading Products...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <h2 className="text-red-500 text-xl font-semibold">Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-10">Product Store</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-600 rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
          >
            <div className="overflow-hidden">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-56 object-contain p-4 group-hover:scale-105 transition duration-300"
              />
            </div>

            <div className="p-4">
              <h3 className="font-bold text-lg line-clamp-2 mb-2">
                {product.title}
              </h3>

              <p className="text-white text-sm line-clamp-3 mb-3">
                {product.description}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-green-600">
                  ${product.price}
                </span>

                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
