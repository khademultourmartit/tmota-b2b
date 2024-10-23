import { useQuery } from "@tanstack/react-query";
import apiClient from "@/utils/axios";

export const useGetAirportSearchQuery = (searchInput?: string) => {
  const params = { searchInput: searchInput };
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery({
    queryKey: ["banner-slider"],
    queryFn: async () =>
      (await apiClient.get("/company/notices?page=1&limit=20", { params }))
        .data,
  });
  return { data, error, isError, isLoading, isPending, isFetching };
};
