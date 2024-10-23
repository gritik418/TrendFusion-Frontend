import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const adminProductAPi = createApi({
  reducerPath: "adminProducts",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/product`,
  }),
  endpoints: (builder) => ({
    addProduct: builder.mutation<any, Product>({
      query: (data) => ({
        url: "/add",
        body: data,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),
  }),
});

export const { useAddProductMutation } = adminProductAPi;

export default adminProductAPi;
