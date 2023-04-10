import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { GetKpisResponses, GetProductResponses, GetTransactionsResponses } from './types';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  reducerPath: 'main',
  tagTypes: ['Kpis', 'Products', 'Transactions'],
  endpoints: (build) => ({
    getKpis: build.query<Array<GetKpisResponses>, void>({
      query: () => 'kpi/kpis/',
      providesTags: ['Kpis'],
    }),
    getProducts: build.query<Array<GetProductResponses>, void>({
      query: () => 'product/products/',
      providesTags: ['Products'],
    }),
    getTransactions: build.query<Array<GetTransactionsResponses>, void>({
      query: () => 'transaction/transactions/',
      providesTags: ['Transactions'],
    }),
  }),
});

export const { useGetKpisQuery, useGetProductsQuery, useGetTransactionsQuery } = api;
