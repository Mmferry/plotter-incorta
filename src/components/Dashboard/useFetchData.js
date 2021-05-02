import { useMutation } from "react-query";
import { fetchData } from "../../api";

export const useFetchData = (queryClient, setResponse, setError, setIsPlotterLoading) => {
  const { mutate, isError, isLoading } = useMutation(fetchData, {
    onSuccess: (data, variables) => {
      queryClient.setQueryData(["plotter", { id: variables.id }], data);
      setResponse(data);
      setIsPlotterLoading(false);
    },
    onError: (err) => {
      setError(err);
    },
    retry: (3)
  });

  return { mutate, isError, isLoading };
};
