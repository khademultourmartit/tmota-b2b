import apiClient from "@/utils/axios";

const apiUrl = "user-deposit-request";

export const getDepositRequests = async (params: any) => {
  return apiClient.get(apiUrl, { params });
};

export const getDepositRequest = async (id: number) => {
  return apiClient.get(`${apiUrl}/${id}`);
};

export const createDepositRequest = async (data: any) => {
  return apiClient.post(apiUrl, data);
};

export const updateDepositRequest = async (id: number, data: any) => {
  return apiClient.patch(`${apiUrl}/${id}`, data);
};

