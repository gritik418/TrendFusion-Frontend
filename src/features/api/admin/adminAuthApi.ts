import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const adminAuthApi = createApi({
  reducerPath: "adminAuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_BASE_URL}/admin/auth`,
  }),
  endpoints: (builder) => ({
    adminLogin: builder.mutation<
      AuthResponse,
      { email: string; password: string }
    >({
      query: (data) => ({
        url: "/login",
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

export const { useAdminLoginMutation } = adminAuthApi;

export default adminAuthApi;
