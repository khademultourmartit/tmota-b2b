import apiClient from "@/utils/axios";

export const flightSearch = async (data: any) => {
  console.log(data, "axiosdata");

  return apiClient.post("/partner/flight/flight-search", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
