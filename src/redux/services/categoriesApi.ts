import { ecommerceApi } from "../api";

export type Category = {
  id: number;
  name: string;
  slug: string;
  image: string;
};

export const CategoryApi = ecommerceApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<Category[], void>({
      query: () => "/categories",
    }),
  }),
});

export const { useGetCategoriesQuery } = CategoryApi;