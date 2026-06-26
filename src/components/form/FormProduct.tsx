"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(100, "Title must be less than 100 characters."),

  price: z.coerce.number().min(1, "Price must be greater than 0."),

  categoryId: z.coerce.number().min(1, "Category ID is required."),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(500, "Description must be less than 500 characters."),

  images: z.string().url("Please enter a valid image URL."),
});

type ProductFormValues = z.output<typeof formSchema>;

export default function FormProduct() {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      title: "",
      price: 0,
      categoryId: 1,
      description: "",
      images: "",
    },
  });

  const onSubmit: SubmitHandler<ProductFormValues> = (data) => {
    toast.success("Product created successfully!", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-muted p-4 text-sm">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
    });

    console.log(data);

    form.reset();
  };

  return (
    <Card className="mx-auto w-full max-w-xl">
      <CardHeader>
        <CardTitle>Create Product</CardTitle>
        <CardDescription>
          Fill in the information below to create a new product.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form id="create-product-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {/* Title */}
            <Controller
              control={form.control}
              name="title"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Title</FieldLabel>

                  <Input
                    {...field}
                    placeholder="MacBook Pro M4"
                    aria-invalid={fieldState.invalid}
                  />

                  <FieldDescription>
                    Product name displayed to customers.
                  </FieldDescription>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Price */}
            <Controller
              control={form.control}
              name="price"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Price</FieldLabel>

                  <Input
                    type="number"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder="999"
                    aria-invalid={fieldState.invalid}
                  />

                  <FieldDescription>Enter product price.</FieldDescription>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Category */}
            <Controller
              control={form.control}
              name="categoryId"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Category ID</FieldLabel>

                  <Input
                    type="number"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    placeholder="1"
                    aria-invalid={fieldState.invalid}
                  />

                  <FieldDescription>
                    Existing category identifier.
                  </FieldDescription>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Description */}
            <Controller
              control={form.control}
              name="description"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Description</FieldLabel>

                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      rows={6}
                      className="resize-none"
                      placeholder="Write product description..."
                      aria-invalid={fieldState.invalid}
                    />

                    <InputGroupAddon align="block-end">
                      <InputGroupText>{field.value.length}/500</InputGroupText>
                    </InputGroupAddon>
                  </InputGroup>

                  <FieldDescription>
                    Describe the product features and details.
                  </FieldDescription>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Image */}
            <Controller
              control={form.control}
              name="images"
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Image URL</FieldLabel>

                  <Input
                    {...field}
                    placeholder="https://example.com/image.jpg"
                    aria-invalid={fieldState.invalid}
                  />

                  <FieldDescription>
                    Paste the product image URL.
                  </FieldDescription>

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" type="button" onClick={() => form.reset()}>
          Reset
        </Button>

        <Button type="submit" form="create-product-form">
          Create Product
        </Button>
      </CardFooter>
    </Card>
  );
}
