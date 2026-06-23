import { Product, ProductForm } from "@/lib/types/product";
import { ProductCard } from "./ProductCard";

type Props = {
  products: Product[];
  isFetching: boolean;
  onEdit: (e: React.MouseEvent, product: Product) => void;
  onDelete: (e: React.MouseEvent, id: number) => void;
};

export function ProductGrid({ products, isFetching, onEdit, onDelete }: Props) {
  return (
    <div
      className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-opacity duration-200 ${
        isFetching ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}