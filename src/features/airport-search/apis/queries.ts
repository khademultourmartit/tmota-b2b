import { useQuery } from "@tanstack/react-query";
import apiClient from "@/utils/axios";

export const useGetAirportSearchQuery = (searchInput?: string) => {
  const params = { searchInput: searchInput };

  const { data, error, isLoading, isPending, isFetching, isError } = useQuery({
    queryKey: ["airport-search"],
    queryFn: async () =>
      (await apiClient.get("/airports/search", { params })).data,
  });

  return { data, error, isError, isLoading, isPending, isFetching };
};
 
