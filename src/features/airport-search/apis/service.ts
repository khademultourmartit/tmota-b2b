import apiClient from "@/utils/axios";

export const airportSearch = async (searchInput?: string) => {
  const params = { searchInput: searchInput };
  return apiClient.get("/airports/search", { params });
};
