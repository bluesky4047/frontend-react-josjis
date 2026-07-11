import { createContext, useContext, useState } from "react";
import { useGetMonitoringsQuery } from "./monitoringApi";

const MonitoringContext = createContext();

export const MonitoringProvider = ({ children }) => {
  const [query, setQuery] = useState({});

  const { data, isLoading, isError, error, refetch } =
    useGetMonitoringsQuery(query);

  const addMonitoring = async (data) => await createMonitoring(data).unwrap();

  return (
    <MonitoringContext.Provider
      value={{
        monitorings: data?.data?.url,
        isLoading,
        error: isError ? error : null,

        // 🔥 QUERY CONTROL
        query,
        setQuery,
      }}
    >
      {children}
    </MonitoringContext.Provider>
  );
};

export const useMonitorings = () => {
  return useContext(MonitoringContext);
};
