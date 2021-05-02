import { useQuery } from "react-query";
import { fetchColumns } from "../../api";

export const useFetchColumns = () => {
  const { data, isLoading, isError, error } = useQuery("columns", fetchColumns);

  return { data, isLoading, isError, error };
};
