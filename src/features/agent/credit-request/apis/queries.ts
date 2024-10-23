import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/utils/axios";

const apiUrl = "user-credit-request";

export const useGetCreditRequestsQuery = (params: any) => {
  return useQuery<any[], Error>({
    queryKey: ["credit-requests", params],
    queryFn: async () => (await apiClient.get<any[]>(apiUrl, { params })).data,
  });
};

export const useGetCreditRequestQuery = (id: number) => {
  return useQuery<any, Error>({
    queryKey: ["credit-request", id],
    enabled: !!id,
    queryFn: async () => (await apiClient.get<any>(`${apiUrl}/${id}`)).data,
  });
};

export const useCreateCreditRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-credit-request"],
    mutationFn: async (data: any) => (await apiClient.post(apiUrl, data)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["credit-requests"] });
    },
    onError: (error) => {
      console.error("Error creating credit request:", error);
    },
  });
};

export const useUpdateCreditRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-credit-request"],
    mutationFn: async ({ id, data }: { id: number; data: any }) =>
      (await apiClient.patch(`${apiUrl}/${id}`, data)).data,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["credit-requests"] });
      queryClient.invalidateQueries({
        queryKey: ["credit-request", variables.id],
      });
    },
    onError: (error) => {
      console.error("Error updating credit request:", error);
    },
  });
};
