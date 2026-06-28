import { createContext, useContext, useState } from "react";
import {
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} from "./ordersApi";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 100,
    search: "",
    sortBy: "created_at",
    order: "desc",
  });

  const { data, isLoading, isError, error, refetch } = useGetOrdersQuery(query);

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const editOrder = async (id, status) =>
    await updateOrder({ id, status }).unwrap();

  const removeOrder = async (id) => await deleteOrder(id).unwrap();

  return (
    <OrderContext.Provider
      value={{
        orders: data?.data?.orders || [],
        meta: data?.data?.meta || {},
        isLoading,
        error: isError ? error : null,

        // CRUD
        editOrder,
        removeOrder,

        // 🔥 QUERY CONTROL
        query,
        setQuery,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  return useContext(OrderContext);
};
