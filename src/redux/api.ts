// import { Product } from "@/lib/types/product";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const ecommerceApi = createApi({
//   reducerPath: "ecommerceApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API_URL,
//   }),
//   endpoints: (builder) => ({}),
// });

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ecommerceApi = createApi({
  reducerPath: "ecommerceApi",

  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),

  tagTypes: ["Product", "Category"],

  endpoints: () => ({}),
});