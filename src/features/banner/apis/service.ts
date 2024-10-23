import apiClient from "@/utils/axios";

export const getBannerData = async () => {
  return apiClient.get(`/company/banners?page=1&limit=20`);
};
