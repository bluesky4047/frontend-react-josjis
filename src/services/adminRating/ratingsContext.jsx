import { createContext, useContext, useState } from "react";
import {
  useGetRatingsQuery,
  useCreateRatingMutation,
  useUpdateRatingMutation,
  useDeleteRatingMutation,
} from "./ratingsApi";

const RatingContext = createContext();

export const RatingProvider = ({ children }) => {
  const [query, setQuery] = useState({
    page: 1,
    limit: 100,
    sortBy: "created_at",
    order: "desc",
  });

  const { data, isLoading, isError, error, refetch } =
    useGetRatingsQuery(query);

  const [createRating] = useCreateRatingMutation();
  const [updateRating] = useUpdateRatingMutation();
  const [deleteRating] = useDeleteRatingMutation();

  const addRating = async (data) => await createRating(data).unwrap();

  const editRating = async (id, data) =>
    await updateRating({ id, ...data }).unwrap();

  const removeRating = async (id) => await deleteRating(id).unwrap();

  return (
    <RatingContext.Provider
      value={{
        ratings: data?.data?.ratings || [],
        meta: data?.data?.meta || {},
        isLoading,
        error: isError ? error : null,

        // CRUD
        addRating,
        editRating,
        removeRating,

        // 🔥 QUERY CONTROL
        query,
        setQuery,
      }}
    >
      {children}
    </RatingContext.Provider>
  );
};

export const useRatings = () => {
  return useContext(RatingContext);
};
