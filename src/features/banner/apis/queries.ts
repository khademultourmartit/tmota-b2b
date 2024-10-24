import { useQuery } from "@tanstack/react-query";
import apiClient from "@/utils/axios";

//  banner function
export const useGetBannerQuery = (params: any) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery({
    queryKey: ["banner"],
    queryFn: async () =>
      (await apiClient.get(`/company/banners`, { params })).data,
  });

  return { data, error, isError, isLoading, isPending, isFetching };
};

//  popup function

export const useGetPopupQuery = (params: any) => {
  const { data, error, isLoading, isPending, isFetching, isError } = useQuery({
    queryKey: ["popup"],
    queryFn: async () =>
      (await apiClient.get(`/company/banners`, { params })).data,
  });

  return { data, error, isError, isLoading, isPending, isFetching };
};
