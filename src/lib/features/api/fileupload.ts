import { ecommerceApi } from "@/redux/api";

export type UploadFileResponse = {
  originalname: string;
  filename: string;
  location: string;
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
  }),
});

export const {
  useUploadFileMutation,
} = productApi;