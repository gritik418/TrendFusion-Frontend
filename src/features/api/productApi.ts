import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/product`,
  }),
  endpoints: (builder) => ({
    searchProducts: builder.query<Response, string>({
      query: (searchQuery) => ({
        url: `/suggestion?searchQuery=${searchQuery}`,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useSearchProductsQuery } = productApi;

export default productApi;
