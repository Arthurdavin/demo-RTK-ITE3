// "use client";
// import { useState } from "react";
// import { Product } from "@/lib/types/product";
// import { ProductForm } from "@/schema/productSchema";
// import { ProductGrid } from "./ProductComponents/ProductGrid";
// import { ProductFormModal } from "./ProductComponents/ProductFormModal";
// import { DeleteConfirmModal } from "./ProductComponents/DeleteConfirmModal";
// import { Pagination } from "./ProductComponents/Pagination";
// import {
//   useGetProductsQuery,
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
// } from "@/redux/services/product/productApi";

// const LIMIT = 40;

// export function ProductList() {
//   const accessToken = "your-token-here";

//   const [page, setPage] = useState(1);
//   const offset = (page - 1) * LIMIT;

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [initialData, setInitialData] = useState<ProductForm | undefined>(undefined);
//   const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
//   const [formError, setFormError] = useState<string | null>(null);

//   const { data, isLoading, isError, isFetching } = useGetProductsQuery({ offset, limit: LIMIT });
//   const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
//   const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
//   const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

//   const isSaving = isCreating || isUpdating;

//   // ── Modal Handlers ────────────────────────────────────────────────────────
//   const openCreateModal = () => {
//     setEditingId(null);
//     setInitialData(undefined);
//     setFormError(null);
//     setIsModalOpen(true);
//   };

//   const openEditModal = (e: React.MouseEvent, product: Product) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setEditingId(product.id);
//     setInitialData({
//       title: product.title,
//       price: product.price,
//       description: product.description,
//       categoryId: product.category?.id ?? 1,
//       images: product.images ?? [""],
//     });
//     setFormError(null);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setEditingId(null);
//     setFormError(null);
//   };

//   // ── Submit — receives validated data from react-hook-form ─────────────────
//   const handleSubmit = async (data: ProductForm) => {
//     setFormError(null);
//     try {
//       if (editingId !== null) {
//         await updateProduct({
//           id: editingId,
//           updatedProduct: data,
//           accessToken,
//         }).unwrap();
//       } else {
//         await createProduct({ newProduct: data, accessToken }).unwrap();
//       }
//       closeModal();
//     } catch (err: any) {
//       setFormError(err?.data?.message ?? "Something went wrong. Try again.");
//     }
//   };

//   // ── Delete ────────────────────────────────────────────────────────────────
//   const openDeleteModal = (e: React.MouseEvent, id: number) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDeleteTarget(id);
//   };

//   const handleDeleteConfirm = async () => {
//     if (deleteTarget === null) return;
//     try {
//       await deleteProduct({ id: deleteTarget, accessToken }).unwrap();
//     } finally {
//       setDeleteTarget(null);
//     }
//   };

//   // ── Render ────────────────────────────────────────────────────────────────
//   if (isLoading) {
//     return (
//       <div className="flex h-64 items-center justify-center">
//         <div className="flex flex-col items-center gap-3 text-gray-400">
//           <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
//           <p className="text-sm font-medium">Loading products...</p>
//         </div>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="mx-auto mt-20 max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center">
//         <p className="mb-2 text-2xl">⚠️</p>
//         <p className="font-semibold text-red-700">Failed to load products</p>
//         <p className="mt-1 text-sm text-red-500">Check your connection and try again.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-7xl px-4 py-8">
//       {/* Header */}
//       <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Products</h1>
//           <p className="mt-0.5 text-sm text-gray-500">{data?.length ?? 0} items shown</p>
//         </div>
//         <button
//           onClick={openCreateModal}
//           className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
//         >
//           <span className="text-lg leading-none">+</span> Add Product
//         </button>
//       </div>

//       <ProductGrid
//         products={data ?? []}
//         isFetching={isFetching}
//         onEdit={openEditModal}
//         onDelete={openDeleteModal}
//       />

//       <Pagination
//         page={page}
//         hasNext={(data?.length ?? 0) >= LIMIT}
//         isFetching={isFetching}
//         onPrev={() => setPage((p) => Math.max(1, p - 1))}
//         onNext={() => setPage((p) => p + 1)}
//       />

//       {/* ✅ No more onChange/form props — just initialData + onSubmit(data: ProductForm) */}
//       <ProductFormModal
//         isOpen={isModalOpen}
//         editingId={editingId}
//         initialData={initialData}
//         isSaving={isSaving}
//         formError={formError}
//         onSubmit={handleSubmit}
//         onClose={closeModal}
//       />

//       <DeleteConfirmModal
//         isOpen={deleteTarget !== null}
//         isDeleting={isDeleting}
//         onConfirm={handleDeleteConfirm}
//         onCancel={() => setDeleteTarget(null)}
//       />
//     </div>
//   );
// }


"use client";
import { useState } from "react";
import { Product } from "@/lib/types/product";
import { ProductGrid } from "./ProductComponents/ProductGrid";
import { ProductFormModal} from "./ProductComponents/ProductFormModal";
import { DeleteConfirmModal } from "./ProductComponents/DeleteConfirmModal";
import { Pagination } from "./ProductComponents/Pagination";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/redux/services/product/productApi";

const LIMIT = 40;

// Matches the InitialData type expected by ProductFormModal
type EditInitialData = {
  title: string;
  description: string;
  price: number;
  categoryId: number;
  imageUrl?: string;
};

export interface ProductPayload {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export function ProductList() {
  const accessToken = "your-token-here";

  const [page, setPage] = useState(1);
  const offset = (page - 1) * LIMIT;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [initialData, setInitialData] = useState<EditInitialData | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const { data, isLoading, isError, isFetching } = useGetProductsQuery({ offset, limit: LIMIT });
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const isSaving = isCreating || isUpdating;

  const openCreateModal = () => {
    setEditingId(null);
    setInitialData(undefined);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingId(product.id);
    setInitialData({
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.category?.id ?? 1,
      imageUrl: product.images?.[0], // single existing image for preview
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormError(null);
  };

  // Modal already uploaded the file and built the payload (images: string[])
  const handleSubmit = async (data: ProductPayload) => {
    setFormError(null);
    try {
      if (editingId !== null) {
        await updateProduct({
          id: editingId,
          updatedProduct: data,
          accessToken,
        }).unwrap();
      } else {
        await createProduct({ newProduct: data, accessToken }).unwrap();
      }
      closeModal();
    } catch (err: any) {
      setFormError(err?.data?.message ?? "Something went wrong. Try again.");
    }
  };

  const openDeleteModal = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    setDeleteTarget(id);
  };

  const handleDeleteConfirm = async () => {
    if (deleteTarget === null) return;
    try {
      await deleteProduct({ id: deleteTarget, accessToken }).unwrap();
    } finally {
      setDeleteTarget(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          <p className="text-sm font-medium">Loading products...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto mt-20 max-w-md rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="mb-2 text-2xl">⚠️</p>
        <p className="font-semibold text-red-700">Failed to load products</p>
        <p className="mt-1 text-sm text-red-500">Check your connection and try again.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-0.5 text-sm text-gray-500">{data?.length ?? 0} items shown</p>
        </div>
        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
        >
          <span className="text-lg leading-none">+</span> Add Product
        </button>
      </div>

      <ProductGrid
        products={data ?? []}
        isFetching={isFetching}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
      />

      <Pagination
        page={page}
        hasNext={(data?.length ?? 0) >= LIMIT}
        isFetching={isFetching}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => p + 1)}
      />

      <ProductFormModal
        isOpen={isModalOpen}
        editingId={editingId}
        initialData={initialData}
        isSaving={isSaving}
        formError={formError}
        onSubmit={handleSubmit}
        onClose={closeModal}
      />

      <DeleteConfirmModal
        isOpen={deleteTarget !== null}
        isDeleting={isDeleting}
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}