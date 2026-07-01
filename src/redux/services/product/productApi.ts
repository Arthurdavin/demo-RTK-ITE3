import { ecommerceApi } from "@/redux/api";

import {
  Product,
  CreateProductDto,
  UpdateProductDto,
} from "@/lib/types/product";

interface PaginationParams {
  offset?: number;
  limit?: number;
}

interface CreateProductArgs {
  newProduct: CreateProductDto;
  accessToken: string;
}

interface UpdateProductArgs {
  id: number;
  updatedProduct: UpdateProductDto;
  accessToken: string;
}

interface DeleteProductArgs {
  id: number;
  accessToken: string;
}

export const productApi = ecommerceApi.injectEndpoints({
  endpoints: (builder) => ({
    // GET ALL
    getProducts: builder.query<Product[], PaginationParams | void>({
      query: (params) => {
        const offset = params?.offset ?? 0;
        const limit = params?.limit ?? 10;

        return `/products?offset=${offset}&limit=${limit}`;
      },

      providesTags: [{ type: "Product", id: "LIST" }],
    }),

    // GET BY ID
    getProductById: builder.query<Product, number>({
      query: (id) => `/products/${id}`,

      providesTags: (result, error, id) => [
        { type: "Product", id },
      ],
    }),

    // CREATE
    createProduct: builder.mutation<Product, CreateProductArgs>({
      query: ({ newProduct, accessToken }) => ({
        url: "/products",
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: newProduct,
      }),

      invalidatesTags: [{ type: "Product", id: "LIST" }],
    }),

    // UPDATE
    updateProduct: builder.mutation<Product, UpdateProductArgs>({
      query: ({ id, updatedProduct, accessToken }) => ({
        url: `/products/${id}`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        body: updatedProduct,
      }),

      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),

    // DELETE
    deleteProduct: builder.mutation<void, DeleteProductArgs>({
      query: ({ id, accessToken }) => ({
        url: `/products/${id}`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),

      invalidatesTags: (result, error, { id }) => [
        { type: "Product", id },
        { type: "Product", id: "LIST" },
      ],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
