"use client";

import { use } from "react";
import Link from "next/link";
import { useGetProductByIdQuery, useGetProductsQuery } from "@/redux/services/product/productApi";

// ─── Types ────────────────────────────────────────────────────────────────────
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: { id: number; name: string; image: string };
  createdAt: string;
  updatedAt: string;
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductByIdQuery(Number(id));

  // Fetch related: same category, exclude current
  const { data: allProducts } = useGetProductsQuery({ offset: 0, limit: 20 });
  const related = allProducts
    ?.filter(
      (p: Product) =>
        p.category?.id === product?.category?.id && p.id !== product?.id
    )
    .slice(0, 4);

  // ── Loading ──
  if (isLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          <p className="text-sm font-medium">Loading product...</p>
        </div>
      </div>
    );
  }

  // ── Error ──
  if (isError || !product) {
    return (
      <div className="mx-auto mt-24 max-w-md rounded-2xl border border-red-100 bg-red-50 p-8 text-center">
        <p className="text-3xl">⚠️</p>
        <p className="mt-3 font-semibold text-red-700">Product not found</p>
        <p className="mt-1 text-sm text-red-400">
          This product may have been removed.
        </p>
        <Link
          href="/productlist"
          className="mt-5 inline-block rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700"
        >
          ← Back to products
        </Link>
      </div>
    );
  }

  const mainImage =
    product.images?.[0] || "https://placehold.co/800x600?text=No+Image";

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* ── Breadcrumb ── */}
      <nav className="mb-8 flex items-center gap-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-gray-600">
          Home
        </Link>
        <span>/</span>
        <Link href="/productlist" className="hover:text-gray-600">
          Products
        </Link>
        <span>/</span>
        <span className="line-clamp-1 text-gray-700">{product.title}</span>
      </nav>

      {/* ── Main Section ── */}
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Left — Images */}
        <div className="flex flex-col gap-3">
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
            <img
              src={mainImage}
              alt={product.title}
              className="h-96 w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "https://placehold.co/800x600?text=No+Image";
              }}
            />
          </div>

          {/* Thumbnail strip */}
          {product.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {product.images.map((img: string, i: number) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.title} image ${i + 1}`}
                  className="h-16 w-16 flex-shrink-0 cursor-pointer rounded-lg border border-gray-200 object-cover transition hover:border-blue-400"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://placehold.co/64x64?text=?";
                  }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right — Info */}
        <div className="flex flex-col">
          {/* Category badge */}
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
            <img
              src={product.category?.image}
              alt={product.category?.name}
              className="h-4 w-4 rounded-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
            {product.category?.name}
          </span>

          <h1 className="mt-3 text-3xl font-bold text-gray-400 leading-snug">
            {product.title}
          </h1>

          <p className="mt-4 text-sm leading-relaxed text-gray-500">
            {product.description}
          </p>

          {/* Price */}
          <div className="mt-6 flex items-baseline gap-2">
            <span className="text-4xl font-bold text-gray-400">
              ${product.price.toLocaleString()}
            </span>
            <span className="text-sm text-gray-400">USD</span>
          </div>

          {/* Meta */}
          <div className="mt-6 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-gray-50 px-4 py-3">
              <p className="text-xs text-gray-400">Product ID</p>
              <p className="mt-0.5 font-medium text-gray-700">#{product.id}</p>
            </div>
            <div className="rounded-xl bg-gray-50 px-4 py-3">
              <p className="text-xs text-gray-400">Category</p>
              <p className="mt-0.5 font-medium text-gray-700">
                {product.category?.name}
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 px-4 py-3">
              <p className="text-xs text-gray-400">Added</p>
              <p className="mt-0.5 font-medium text-gray-700">
                {new Date(product.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 px-4 py-3">
              <p className="text-xs text-gray-400">Last updated</p>
              <p className="mt-0.5 font-medium text-gray-700">
                {new Date(product.updatedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/productlist"
              className="flex-1 rounded-xl bg-blue-600 py-3 text-center text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
            >
              ← Back to list
            </Link>
          </div>
        </div>
      </div>

      {/* ── Related Products ── */}
      {related && related.length > 0 && (
        <section className="mt-16">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              More from{" "}
              <span className="text-blue-600">{product.category?.name}</span>
            </h2>
            <Link
              href="/productlist"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              View all →
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p: Product) => (
              <Link
                key={p.id}
                href={`/productlist/${p.id}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
              >
                <div className="h-44 overflow-hidden bg-gray-50">
                  <img
                    src={
                      p.images?.[0] ||
                      "https://placehold.co/400x300?text=No+Image"
                    }
                    alt={p.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "https://placehold.co/400x300?text=No+Image";
                    }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="line-clamp-1 text-sm font-semibold text-gray-900 group-hover:text-blue-600">
                    {p.title}
                  </p>
                  <p className="mt-auto pt-3 text-base font-bold text-gray-900">
                    ${p.price.toLocaleString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}