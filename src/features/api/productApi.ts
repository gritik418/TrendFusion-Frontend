import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type SearchProductsResponse = {
  message?: string;
  success: boolean;
  products?: Product[];
};

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
    searchProducts: builder.query<SearchProductsResponse, string>({
      query: (searchQuery) => ({
        url: `/search?searchQuery=${searchQuery}`,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getProductById: builder.query<GetProductByIdResponse, string>({
      query: (productId) => ({
        url: `/${productId}`,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useSearchProductsQuery, useGetProductByIdQuery } = productApi;

export default productApi;
