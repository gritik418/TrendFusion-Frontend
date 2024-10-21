import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/auth" }),
  endpoints: (builder) => ({
    userLogin: builder.mutation<AuthResponse, LoginDataType>({
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
    userSignup: builder.mutation<AuthResponse, SignupDataType>({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    verifyEmail: builder.mutation<AuthResponse, EmailVerificationDataType>({
      query: (data) => ({
        url: "/verify",
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useUserLoginMutation,
  useUserSignupMutation,
  useVerifyEmailMutation,
} = authApi;

export default authApi;
