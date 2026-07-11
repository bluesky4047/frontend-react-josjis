import { createContext, useContext, useState } from "react";
import {
  useGetTablesQuery,
  useCreateTableMutation,
  useUpdateTableMutation,
  useDeleteTableMutation,
} from "./tablesApi";

const TableContext = createContext();

export const TableProvider = ({ children }) => {
  const [query, setQuery] = useState({});

  const { data, isLoading, isError, error, refetch } = useGetTablesQuery(query);

  const [createTable] = useCreateTableMutation();
  const [updateTable] = useUpdateTableMutation();
  const [deleteTable] = useDeleteTableMutation();

  const addTable = async (data) => await createTable(data).unwrap();

  const editTable = async (id, data) =>
    await updateTable({ id, ...data }).unwrap();

  const removeTable = async (id) => await deleteTable(id).unwrap();

  return (
    <TableContext.Provider
      value={{
        tables: data?.data || [],
        isLoading,
        error: isError ? error : null,

        // CRUD
        addTable,
        editTable,
        removeTable,

        // 🔥 QUERY CONTROL
        query,
        setQuery,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTables = () => {
  return useContext(TableContext);
};
