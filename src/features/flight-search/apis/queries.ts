import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/utils/axios";

export const useFlightSearchMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["flight-search"],
    mutationFn: async (body: any) =>
      (await apiClient.post("/partner/flight/flight-search", body)).data,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["flight"] });
    },
    onError: (error) => {
      console.error("Error flight search:", error);
    },
  });
};
