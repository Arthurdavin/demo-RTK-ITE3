// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import {
//   useGetProductsQuery,
//   useCreateProductMutation,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
// } from "../lib/service/productApi";
// import { ProductForm } from "@/lib/types/product";

// // ─── Types ───────────

// const EMPTY_FORM: ProductForm = {
//   title: "",
//   price: 0,
//   description: "",
//   categoryId: 1,
//   images: [""],
// };

// // ─── Component ───────────────────────────────────────────────────────────────
// export function ProductList() {
//   const accessToken = "your-token-here";

//   // Pagination
//   const [offset, setOffset] = useState(0);
//   const LIMIT = 8;

//   // Modal state
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
//   const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
//   const [formError, setFormError] = useState<string | null>(null);

//   // RTK Query
//   const { data, isLoading, isError, isFetching } = useGetProductsQuery({
//     offset,
//     limit: LIMIT,
//   });

//   const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
//   const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
//   const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

//   const isSaving = isCreating || isUpdating;

//   // ── Handlers ─────────────────────────────────────────────────────────────
//   const openCreateModal = () => {
//     setEditingId(null);
//     setForm(EMPTY_FORM);
//     setFormError(null);
//     setIsModalOpen(true);
//   };

//   const openEditModal = (e: React.MouseEvent, product: any) => {
//     e.preventDefault(); // prevent Link navigation
//     e.stopPropagation();
//     setEditingId(product.id);
//     setForm({
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

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setFormError(null);
//     try {
//       if (editingId !== null) {
//         await updateProduct({
//           id: editingId,
//           updatedProduct: form,
//           accessToken,
//         }).unwrap();
//       } else {
//         await createProduct({ newProduct: form, accessToken }).unwrap();
//       }
//       closeModal();
//     } catch (err: any) {
//       setFormError(err?.data?.message ?? "Something went wrong. Try again.");
//     }
//   };

//   const handleDeleteConfirm = async () => {
//     if (deleteTarget === null) return;
//     try {
//       await deleteProduct({ id: deleteTarget, accessToken }).unwrap();
//     } catch {
//       // silent — could add toast here
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
//       <div className="mx-auto max-w-md mt-20 rounded-xl border border-red-200 bg-red-50 p-6 text-center">
//         <p className="text-2xl mb-2">⚠️</p>
//         <p className="font-semibold text-red-700">Failed to load products</p>
//         <p className="mt-1 text-sm text-red-500">
//           Check your connection and try again.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="mx-auto max-w-7xl px-4 py-8">
//       {/* ── Header ── */}
//       <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">Products</h1>
//           <p className="mt-0.5 text-sm text-gray-500">
//             {data?.length ?? 0} items shown
//           </p>
//         </div>
//         <button
//           onClick={openCreateModal}
//           className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
//         >
//           <span className="text-lg leading-none">+</span> Add Product
//         </button>
//       </div>

//       {/* ── Grid ── */}
//       <div
//         className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 transition-opacity duration-200 ${
//           isFetching ? "opacity-50 pointer-events-none" : "opacity-100"
//         }`}
//       >
//         {data?.map((product: any) => (
//           // ✅ Entire card is a Link to detail page
//           <Link
//             key={product.id}
//             href={`/productlist/${product.id}`}
//             className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
//           >
//             <div className="relative h-48 bg-gray-100">
//               <img
//                 src={product.images?.[0] || "https://placehold.co/400x300?text=No+Image"}
//                 alt={product.title}
//                 className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
//                 onError={(e) => {
//                   (e.target as HTMLImageElement).src =
//                     "https://placehold.co/400x300?text=No+Image";
//                 }}
//               />
//               <span className="absolute right-2 top-2 rounded-full bg-white/80 px-2 py-0.5 text-xs font-medium text-gray-600 backdrop-blur-sm">
//                 #{product.id}
//               </span>
//             </div>

//             <div className="flex flex-1 flex-col p-4">
//               <p className="text-xs font-medium uppercase tracking-wide text-blue-500">
//                 {product.category?.name ?? "Uncategorized"}
//               </p>
//               <h2 className="mt-1 line-clamp-1 text-base font-semibold text-gray-900">
//                 {product.title}
//               </h2>
//               <p className="mt-1 line-clamp-2 flex-1 text-sm text-gray-500">
//                 {product.description}
//               </p>
//               <div className="mt-4 flex items-center justify-between">
//                 <span className="text-xl font-bold text-gray-900">
//                   ${product.price.toLocaleString()}
//                 </span>
//               </div>

//               {/* ✅ e.preventDefault() + e.stopPropagation() ដើម្បី block Link */}
//               <div className="mt-4 flex gap-2">
//                 <button
//                   onClick={(e) => openEditModal(e, product)}
//                   className="flex-1 rounded-lg border border-gray-200 bg-white py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 active:scale-95"
//                 >
//                   Edit
//                 </button>
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     setDeleteTarget(product.id);
//                   }}
//                   className="flex-1 rounded-lg bg-red-50 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 active:scale-95"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </Link>
//         ))}
//       </div>

//       {/* ── Pagination ── */}
//       <div className="mt-10 flex items-center justify-center gap-4">
//         <button
//           onClick={() => setOffset((o) => Math.max(0, o - LIMIT))}
//           disabled={offset === 0 || isFetching}
//           className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
//         >
//           ← Previous
//         </button>
//         <span className="text-sm text-gray-500">
//           Page {Math.floor(offset / LIMIT) + 1}
//         </span>
//         <button
//           onClick={() => setOffset((o) => o + LIMIT)}
//           disabled={(data?.length ?? 0) < LIMIT || isFetching}
//           className="rounded-lg border px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
//         >
//           Next →
//         </button>
//       </div>

//       {/* ── Create / Edit Modal ── */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
//           <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
//             <div className="mb-5 flex items-center justify-between">
//               <h2 className="text-lg font-semibold text-gray-900">
//                 {editingId !== null ? "Edit Product" : "New Product"}
//               </h2>
//               <button
//                 onClick={closeModal}
//                 className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
//               >
//                 ✕
//               </button>
//             </div>

//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Title
//                 </label>
//                 <input
//                   required
//                   value={form.title}
//                   onChange={(e) => setForm({ ...form, title: e.target.value })}
//                   placeholder="Product name"
//                   className="text-gray-900 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="mb-1 block text-sm font-medium text-gray-700">
//                     Price ($)
//                   </label>
//                   <input
//                     required
//                     type="number"
//                     min={0}
//                     value={form.price}
//                     onChange={(e) =>
//                       setForm({ ...form, price: Number(e.target.value) })
//                     }
//                     className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-900"
//                   />
//                 </div>
//                 <div>
//                   <label className="mb-1 block text-sm font-medium text-gray-700">
//                     Category ID
//                   </label>
//                   <input
//                     required
//                     type="number"
//                     min={1}
//                     value={form.categoryId}
//                     onChange={(e) =>
//                       setForm({ ...form, categoryId: Number(e.target.value) })
//                     }
//                     className="text-gray-900 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Description
//                 </label>
//                 <textarea
//                   required
//                   rows={3}
//                   value={form.description}
//                   onChange={(e) =>
//                     setForm({ ...form, description: e.target.value })
//                   }
//                   placeholder="Short product description"
//                   className="text-gray-900 w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Image URL
//                 </label>
//                 <input
//                   value={form.images[0]}
//                   onChange={(e) =>
//                     setForm({ ...form, images: [e.target.value] })
//                   }
//                   placeholder="https://example.com/image.jpg"
//                   className="text-gray-900 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
//                 />
//               </div>

//               {formError && (
//                 <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
//                   {formError}
//                 </p>
//               )}

//               <div className="mt-1 flex gap-3">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={isSaving}
//                   className="flex-1 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
//                 >
//                   {isSaving
//                     ? "Saving..."
//                     : editingId !== null
//                     ? "Save Changes"
//                     : "Create Product"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* ── Delete Confirmation ── */}
//       {deleteTarget !== null && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
//           <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl">
//             <p className="text-2xl mb-3 text-center">🗑️</p>
//             <h2 className="text-center text-lg font-semibold text-gray-900">
//               Delete product?
//             </h2>
//             <p className="mt-1 text-center text-sm text-gray-500">
//               This action cannot be undone.
//             </p>
//             <div className="mt-6 flex gap-3">
//               <button
//                 onClick={() => setDeleteTarget(null)}
//                 className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDeleteConfirm}
//                 disabled={isDeleting}
//                 className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-60"
//               >
//                 {isDeleting ? "Deleting..." : "Delete"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from "@/lib/service/productApi";
import { Product, ProductForm } from "@/lib/types/product";
import { ProductGrid } from "./ProductComponents/ProductGrid";
import { ProductFormModal } from "./ProductComponents/ProductFormModal";
import { DeleteConfirmModal } from "./ProductComponents/DeleteConfirmModal";
import { Pagination } from "./ProductComponents/Pagination";

const EMPTY_FORM: ProductForm = {
  title: "",
  price: 0,
  description: "",
  categoryId: 1,
  images: [""],
};

const LIMIT = 8;

export function ProductList() {
  const accessToken = "your-token-here";

  // Pagination
  const [page, setPage] = useState(1);
  const offset = (page - 1) * LIMIT;

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);
  const [deleteTarget, setDeleteTarget] = useState<number | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // RTK Query
  const { data, isLoading, isError, isFetching } = useGetProductsQuery({ offset, limit: LIMIT });
  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const isSaving = isCreating || isUpdating;

  // ── Modal Handlers ────────────────────────────────────────────────────────
  const openCreateModal = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setIsModalOpen(true);
  };

  const openEditModal = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingId(product.id);
    setForm({
      title: product.title,
      price: product.price,
      description: product.description,
      categoryId: product.category?.id ?? 1,
      images: product.images ?? [""],
    });
    setFormError(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setFormError(null);
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    try {
      if (editingId !== null) {
        await updateProduct({ id: editingId, updatedProduct: form, accessToken }).unwrap();
      } else {
        await createProduct({ newProduct: form, accessToken }).unwrap();
      }
      closeModal();
    } catch (err: any) {
      setFormError(err?.data?.message ?? "Something went wrong. Try again.");
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────
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

  // ── Render ────────────────────────────────────────────────────────────────
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
      {/* Header */}
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

      {/* Grid */}
      <ProductGrid
        products={data ?? []}
        isFetching={isFetching}
        onEdit={openEditModal}
        onDelete={openDeleteModal}
      />

      {/* Pagination */}
      <Pagination
        page={page}
        hasNext={(data?.length ?? 0) >= LIMIT}
        isFetching={isFetching}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => p + 1)}
      />

      {/* Modals */}
      <ProductFormModal
        isOpen={isModalOpen}
        editingId={editingId}
        form={form}
        isSaving={isSaving}
        formError={formError}
        onChange={setForm}
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