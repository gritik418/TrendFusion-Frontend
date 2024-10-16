import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api" }),
  endpoints: (builder) => ({
    userLogin: builder.mutation<object, LoginDataType>({
      query: (data) => ({
        url: "/auth/login",
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

export const { useUserLoginMutation } = apiSlice;

export default apiSlice;
