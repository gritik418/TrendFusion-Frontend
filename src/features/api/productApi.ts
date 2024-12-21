import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetProductByIdResponse = {
  product?: Product;
  message?: string;
  variants?: Variants[];
  success: boolean;
};

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/product`,
  }),
  endpoints: (builder) => ({
    getProductById: builder.query<GetProductByIdResponse, string>({
      query: (productId) => ({
        url: `/variants/${productId}`,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetProductByIdQuery } = productApi;

export default productApi;
