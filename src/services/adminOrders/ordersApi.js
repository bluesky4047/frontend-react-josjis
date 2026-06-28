import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Redux Toolkit (RTK) adalah library yang menyederhanakan penggunaan Redux dengan menyediakan utilitas seperti createSlice, configureStore, dan RTK Query.
// RTK Query adalah bagian dari RTK yang memungkinkan pengelolaan data server-side dengan caching otomatis, invalidation, dan hooks siap pakai.
// File ini mendefinisikan API slice untuk mengelola data orders menggunakan RTK Query.

export const ordersApi = createApi({
  // reducerPath: Nama unik untuk slice ini di Redux store. Digunakan untuk menyimpan cache dan state RTK Query.
  reducerPath: "ordersApi",

  baseQuery: fetchBaseQuery({
    // baseUrl: URL dasar untuk semua request API. Diambil dari environment variable VITE_API_URL dan ditambahkan "/api".
    baseUrl: import.meta.env.VITE_API_URL,
    // credentials: "include" memastikan cookie dikirim dengan setiap request, berguna untuk autentikasi berbasis session.
    credentials: "include",
  }),

  // tagTypes: Array dari string yang mendefinisikan tag untuk invalidasi cache. Ketika data berubah, cache dengan tag tertentu dapat dihapus otomatis.
  tagTypes: ["Order"],

  endpoints: (builder) => ({
    // Endpoint untuk GET /orders - Menggunakan query untuk operasi read-only. Data akan dicache dan dapat diakses ulang tanpa request baru.
    getOrders: builder.query({
      query: (params = {}) => {
        const cleanParams = Object.fromEntries(
          Object.entries(params).filter(
            ([_, v]) => v !== "" && v !== null && v !== undefined,
          ),
        );

        return {
          url: "/orders",
          params: cleanParams,
        };
      },
      providesTags: ["Order"],
    }),

    getOrderById: builder.query({
      query: (id) => `/orders/${id}`,
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    // Endpoint untuk PUT /orders/:id - Mutation untuk update product berdasarkan ID.
    updateOrder: builder.mutation({
      query: ({ id, status }) => ({
        url: `/orders/${id}`,
        method: "PUT",
        body: {
          status,
        },
      }),
      invalidatesTags: ["Order"],
    }),

    // Endpoint untuk DELETE /orders/:id - Mutation untuk menghapus product.
    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Order"], // Invalidasi cache setelah delete.
    }),
  }),
});

// Export hooks yang dihasilkan secara otomatis oleh RTK Query. Hooks ini dapat digunakan di komponen React untuk mengakses data dan melakukan mutations.
// Contoh: useGetOrdersQuery() untuk fetch orders, useCreateOrderMutation() untuk membuat product baru.
export const {
  useGetOrdersQuery,
  useGetOrderByIdQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;
