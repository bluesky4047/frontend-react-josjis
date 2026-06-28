import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "../services/adminProducts/productsApi";
import { ordersApi } from "../services/adminOrders/ordersApi";
import { ratingsApi } from "../services/adminRating/ratingsApi";

export const store = configureStore({
  reducer: {
    // RTK Query — reducer & cache untuk todos
    [productsApi.reducerPath]: productsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    [ratingsApi.reducerPath]: ratingsApi.reducer,
    // [paymentsApi.reducerPath]: paymentsApi.reducer,
    // [tablesApi.reducerPath]: tablesApi.reducer,
  },

  // WAJIB menambahkan: middleware RTK Query untuk caching, invalidasi, polling
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      ordersApi.middleware,
      ratingsApi.middleware,
      // paymentsApi.middleware,
      // tablesApi.middleware,
    ),
});
