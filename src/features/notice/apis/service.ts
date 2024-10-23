import apiClient from "@/utils/axios";

export const getNoticeData = async () => {
  return apiClient.get(`/company/notices?page=1&limit=20`);
};
