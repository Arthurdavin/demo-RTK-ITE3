import Link from "next/link";
import { Product } from "@/lib/types/product";

type Props = {
  product: Product;
  onEdit: (e: React.MouseEvent, product: Product) => void;
  onDelete: (e: React.MouseEvent, id: number) => void;
};

export function ProductCard({ product, onEdit, onDelete }: Props) {
  return (
    <Link
      href={`/productlist/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
    >
      <div className="relative h-48 bg-gray-100">
        <img
          crossOrigin="anonymous"
          src={
            product.images?.[0] ?? "https://placehold.co/400x300?text=No+Image"
          }
          alt={product.title}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/400x300?text=No+Image";
          }}
        />
      </div>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-blue-500">
          {product.category?.name ?? "Uncategorized"}
        </p>
        <h2 className="mt-1 line-clamp-1 text-base font-semibold text-gray-900">
          {product.title}
        </h2>
        <p className="mt-1 line-clamp-2 flex-1 text-sm text-gray-500">
          {product.description}
        </p>
        <div className="mt-4">
          <span className="text-xl font-bold text-gray-900">
            ${product.price.toLocaleString()}
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={(e) => onEdit(e, product)}
            className="flex-1 rounded-lg border border-gray-200 bg-white py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-95"
          >
            Edit
          </button>
          <button
            onClick={(e) => onDelete(e, product.id)}
            className="flex-1 rounded-lg bg-red-50 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 active:scale-95"
          >
            Delete
          </button>
        </div>
      </div>
    </Link>
  );
}
