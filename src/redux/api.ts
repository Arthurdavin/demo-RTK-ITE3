import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ecommerceApi = createApi({

  reducerPath:"ecommerceApi",

  baseQuery:fetchBaseQuery({
    baseUrl:process.env.NEXT_PUBLIC_API_URL,
  }),

  tagTypes:["Product","Category"],
  endpoints:() => ({}),
  
})

// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const ecommerceApi = createApi({
//   reducerPath: "ecommerceApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_API_URL,
//   }),

//   tagTypes: ["Product", "Category"],

//   endpoints: () => ({}),
// });