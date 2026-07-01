import { Category } from './../../../redux/services/categoriesApi';
import { Product } from "@/lib/types/product";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ecommerceApi = createApi({
    reducerPath: "ecommerceApi",
    tagTypes:["Product","Category"],
    baseQuery:fetchBaseQuery({
        baseUrl:process.env.NEXT_PUBLIC_API_URL
    }),
    endpoints:(builder)=>({
        getProducts:builder.query<Product[], void>({
            query:()=>"/products"
        }),
        getProductById:builder.query<Product,number>({
            query:(id)=> `/products/${id}`,
        }),
    })
})

export const {useGetProductsQuery,useGetProductByIdQuery} = ecommerceApi;