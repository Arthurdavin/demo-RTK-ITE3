import { ProductForm } from "@/lib/types/product";

type Props = {
  isOpen: boolean;
  editingId: number | null;
  form: ProductForm;
  isSaving: boolean;
  formError: string | null;
  onChange: (form: ProductForm) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
};

export function ProductFormModal({
  isOpen,
  editingId,
  form,
  isSaving,
  formError,
  onChange,
  onSubmit,
  onClose,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">
            {editingId !== null ? "Edit Product" : "New Product"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          {/* Title */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              required
              value={form.title}
              onChange={(e) => onChange({ ...form, title: e.target.value })}
              placeholder="Product name"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Price + Category */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Price ($)
              </label>
              <input
                required
                type="number"
                min={0}
                value={form.price}
                onChange={(e) =>
                  onChange({ ...form, price: Number(e.target.value) })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category ID
              </label>
              <input
                required
                type="number"
                min={1}
                value={form.categoryId}
                onChange={(e) =>
                  onChange({ ...form, categoryId: Number(e.target.value) })
                }
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => onChange({ ...form, description: e.target.value })}
              placeholder="Short product description"
              className="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Image URL
            </label>
            <input
              value={form.images[0]}
              onChange={(e) => onChange({ ...form, images: [e.target.value] })}
              placeholder="https://example.com/image.jpg"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          {/* Error */}
          {formError && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {formError}
            </p>
          )}

          {/* Actions */}
          <div className="mt-1 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              {isSaving
                ? "Saving..."
                : editingId !== null
                ? "Save Changes"
                : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}