import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetWishlistResponse = {
  message?: string;
  success: boolean;
  wishlist?: WishlistItem[];
};

const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  tagTypes: ["wishlist"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/wishlist`,
  }),
  endpoints: (builder) => ({
    getWishlist: builder.query<GetWishlistResponse, void>({
      query: () => ({
        url: "/",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
      providesTags: ["wishlist"],
    }),
    addToWishlist: builder.mutation<GetWishlistResponse, string>({
      query: (productId) => ({
        url: `/add`,
        method: "POST",
        body: {
          productId,
        },
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
      invalidatesTags: ["wishlist"],
    }),
    removeFromWishlist: builder.mutation<GetWishlistResponse, string>({
      query: (productId) => ({
        url: `/remove/${productId}`,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
      invalidatesTags: ["wishlist"],
    }),
  }),
});

export const {
  useAddToWishlistMutation,
  useGetWishlistQuery,
  useRemoveFromWishlistMutation,
} = wishlistApi;

export default wishlistApi;
