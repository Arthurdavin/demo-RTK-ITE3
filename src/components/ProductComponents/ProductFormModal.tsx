

// components/ProductFormModal.tsx

"use client";

import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import { z } from "zod";
import { X, Plus, Image } from "lucide-react";

import { productSchema } from "@/schema/productSchema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type ProductForm = z.infer<typeof productSchema>;

type Props = {
  isOpen: boolean;
  editingId: number | null;
  initialData?: ProductForm;
  isSaving: boolean;
  formError: string | null;
  onSubmit: (data: ProductForm) => void;
  onClose: () => void;
};

const defaultValues: ProductForm = {
  title: "",
  description: "",
  price: 0,
  categoryId: 1,
  images: [""],
};

export function ProductFormModal({
  isOpen,
  editingId,
  initialData,
  isSaving,
  formError,
  onSubmit,
  onClose,
}: Props) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema) as Resolver<ProductForm>,
    defaultValues,
  });

  const descriptionValue = watch("description") ?? "";

  useEffect(() => {
    reset(initialData ?? defaultValues);
  }, [initialData, reset]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[460px] gap-0 p-0 overflow-hidden">

        {/* Header */}
        <DialogHeader className="px-6 pt-5 pb-4 border-b border-border">
          <p className="text-xs font-medium tracking-widest uppercase text-accent-foreground mb-0.5">
            {editingId ? "Edit product" : "New product"}
          </p>
          <DialogTitle className="text-[17px] font-medium">
            Product details
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-5 flex flex-col gap-4">

            {/* Title */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-muted-foreground">
                Title
              </Label>
              <Input
                {...register("title")}
                placeholder="e.g. MacBook Pro M4"
              />
              {errors.title && (
                <p className="text-xs text-destructive">{errors.title.message}</p>
              )}
            </div>

            {/* Price + Category */}
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-muted-foreground">
                  Price
                </Label>
                <div className="relative">
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                    $
                  </span>
                  <Input
                    type="number"
                    step="0.01"
                    className="pl-6"
                    placeholder="0.00"
                    {...register("price")}
                  />
                </div>
                {errors.price && (
                  <p className="text-xs text-destructive">{errors.price.message}</p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-medium text-muted-foreground">
                  Category ID
                </Label>
                <Input
                  type="number"
                  placeholder="1"
                  {...register("categoryId")}
                />
                {errors.categoryId && (
                  <p className="text-xs text-destructive">{errors.categoryId.message}</p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-baseline justify-between">
                <Label className="text-xs font-medium text-muted-foreground">
                  Description
                </Label>
                <span className="text-[11px] text-muted-foreground">
                  {descriptionValue.length} / 500
                </span>
              </div>
              <Textarea
                rows={3}
                className="resize-none"
                placeholder="Describe the product features and details..."
                {...register("description")}
              />
              {errors.description && (
                <p className="text-xs text-destructive">{errors.description.message}</p>
              )}
            </div>

            {/* Image URL */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-xs font-medium text-muted-foreground">
                Image URL
              </Label>
              <div className="relative">
                <Image
                  size={15}
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
                />
                <Input
                  className="pl-8"
                  placeholder="https://example.com/image.jpg"
                  {...register("images.0")}
                />
              </div>
              {errors.images?.[0] && (
                <p className="text-xs text-destructive">{errors.images[0].message}</p>
              )}
            </div>

            {/* API Error */}
            {formError && (
              <div className="rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {formError}
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-border flex justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" size="sm" disabled={isSaving}>
              <Plus size={14} />
              {isSaving ? "Saving..." : editingId ? "Save changes" : "Create product"}
            </Button>
          </div>
        </form>

      </DialogContent>
    </Dialog>
  );
}