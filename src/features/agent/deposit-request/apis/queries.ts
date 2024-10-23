import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/utils/axios";

const apiUrl = "user-deposit-request";

export const useGetDepositRequestsQuery = (params: any) => {
  return useQuery<any[], Error>({
    queryKey: ["deposit-requests", params],
    queryFn: async () => (await apiClient.get<any[]>(apiUrl, { params })).data,
  });
};

export const useGetDepositRequestQuery = (id: number) => {
  return useQuery<any, Error>({
    queryKey: ["deposit-request", id],
    enabled: !!id,
    queryFn: async () => (await apiClient.get<any>(`${apiUrl}/${id}`)).data,
  });
};

export const useCreateDepositRequestMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["create-deposit-request"],
    mutationFn: async (data: any) => (await apiClient.post(apiUrl, data)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["deposit-requests"] });
    },
    onError: (error) => {
      console.error("Error creating deposit request:", error);
    },
  });
};

export const useUpdateDepositRequestMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-deposit-request"],
    mutationFn: async ({ id, data }: { id: number; data: any }) =>
      (await apiClient.patch(`${apiUrl}/${id}`, data)).data,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["deposit-requests"] });
      queryClient.invalidateQueries({
        queryKey: ["deposit-request", variables.id],
      });
    },
    onError: (error) => {
      console.error("Error updating deposit request:", error);
    },
  });
};
