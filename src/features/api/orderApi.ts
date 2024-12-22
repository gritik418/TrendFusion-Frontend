import { OrderDetails } from "@/app/checkout/cart/page";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type GetOrderResponse = {
  message?: string;
  success: boolean;
  orders?: Order[];
  errors?: any;
  order?: Order;
};

const orderApi = createApi({
  reducerPath: "orderApi",
  tagTypes: ["order"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/order`,
  }),
  endpoints: (builder) => ({
    getOrders: builder.query<GetOrderResponse, void>({
      query: () => ({
        url: "/",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
      providesTags: ["order"],
    }),
    getOrderById: builder.query<GetOrderResponse, string>({
      query: (orderId: string) => ({
        url: `${orderId}`,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
      providesTags: ["order"],
    }),
    createOrder: builder.mutation<GetOrderResponse, OrderDetails>({
      query: (order) => ({
        url: `/create`,
        method: "POST",
        body: order,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
      invalidatesTags: ["order"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useCreateOrderMutation,
  useGetOrderByIdQuery,
} = orderApi;

export default orderApi;
