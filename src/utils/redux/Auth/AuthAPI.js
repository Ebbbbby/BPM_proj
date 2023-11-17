import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BACKEND_IDENTITY_URL,
  }),
  endpoints: (builder) => ({
    login: builder.query({
      query: () => "Auth/login",
    }),
    signup: builder.query({
      query: () => `signup`,
    }),
  }),
});

export const { useLoginQuery, useSignupQuery } = authApi;
