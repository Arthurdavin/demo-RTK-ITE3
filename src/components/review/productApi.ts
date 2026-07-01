import { CreateProductDto } from './../../lib/types/product';
import { Product, UpdateProductDto } from "@/lib/types/product";
import { ecommerceApi } from "@/redux/api";


type UploadFileResponse = {
    originalname:string;
    filename:string;
    location:string;
}

type UpdateProductArgs = {
    id:number;
    updatedProduct: UpdateProductDto;
    accessToken:string;
}

type CreateProductRequest = {
    title: string;
    price: number;
    description:string;
    categoryId:number;
    images:string[];
}

export const profuctApi = ecommerceApi.injectEndpoints({
    endpoints:(builder)=>({

        // create
        createProduct: builder.mutation<Product, CreateProductRequest>({
            query: (newProduct) =>({
                url:"/products",
                method:"POST",
                body: newProduct,
            }),
            invalidatesTags:["Product"],
        }),

        // upload file
        uploadFile: builder.mutation<UploadFileResponse, File>({
            query:(file)=>{
                const formData = new FormData();
                formData.append("file",file);
                return {
                    url:"/files/upload",
                    method:"POST",
                    body: formData,
                }
            }
        })

        })

    })