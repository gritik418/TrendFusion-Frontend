import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetCartResponse = {
  message?: string;
  success: boolean;
  cart?: Cart;
};

const cartApi = createApi({
  reducerPath: "cartApi",
  tagTypes: ["cart"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/cart`,
  }),
  endpoints: (builder) => ({
    getCart: builder.query<GetCartResponse, void>({
      query: () => ({
        url: "/",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
      providesTags: ["cart"],
    }),
    addToCart: builder.mutation<
      GetCartResponse,
      { productId: string; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `/add`,
        method: "POST",
        body: {
          productId,
          quantity,
        },
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
      invalidatesTags: ["cart"],
    }),
    incrementProductQuantity: builder.mutation<GetCartResponse, string>({
      query: (productId) => ({
        url: `/inc/${productId}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
      invalidatesTags: ["cart"],
    }),
    decrementProductQuantity: builder.mutation<GetCartResponse, string>({
      query: (productId) => ({
        url: `/dec/${productId}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
      invalidatesTags: ["cart"],
    }),
    removeFromCart: builder.mutation<GetCartResponse, string>({
      query: (productId) => ({
        url: `/remove/${productId}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
      invalidatesTags: ["cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useIncrementProductQuantityMutation,
  useDecrementProductQuantityMutation,
  useRemoveFromCartMutation,
} = cartApi;

export default cartApi;
