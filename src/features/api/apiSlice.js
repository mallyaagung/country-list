import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "https://restcountries.com/v3.1/all" }),
  tagTypes: ["Coutry"],
  endpoints: (builder) => ({
    getAllCountry: builder.query({
      query: () => "/",
      transformResponse: (res) =>
        res.sort((a, b) => a.name.common.localeCompare(b.name.common)),
      providesTags: ["Country"],
    }),
  }),
});

export const { useGetAllCountryQuery } = apiSlice;
