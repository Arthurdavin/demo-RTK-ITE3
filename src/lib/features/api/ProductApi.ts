import { ecommerceApi } from "@/redux/api";
import { Product, UpdateProductDto } from "@/lib/types/product";

export type UploadFileResponse = {
  originalname: string;
  filename: string;
  location: string;
};

interface UpdateProductArgs {
  id: number;
  updatedProduct: UpdateProductDto;
  accessToken: string;
}

export type CreateProductRequest = {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
};

export const productApi = ecommerceApi.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<UploadFileResponse, File>({
      query: (file) => {
        const formData = new FormData();

        formData.append("file", file);

        return {
          url: "/files/upload",
          method: "POST",
          body: formData,
        };
      },
    }),

    createProduct: builder.mutation<Product, CreateProductRequest>({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct:builder.mutation<Product,UpdateProductArgs>({
      query:({id,updatedProduct,accessToken}) =>({
        url:`/products/${id}`,
        method:"PUT",
        body: updatedProduct,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
      invalidatesTags: ["Product"],
    })
  }),
});

export const {
  useUploadFileMutation,
  useCreateProductMutation,
  useUpdateProductMutation
} = productApi;