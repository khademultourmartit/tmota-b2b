import Axios from "axios";
import { projectConfig } from "@/config";
import { ApiError } from "../api-utils";
import { getJWT } from "@/features/auth/apis/service";
import { publicEndpoints } from "@/constants/public-endpoint";

// Create an Axios instance
const apiClient = Axios.create({
  baseURL: projectConfig.apiBaseUrl,
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    if (
      config.url &&
      !publicEndpoints.find((endpoint) => config.url?.includes(endpoint))
    ) {
      const token = getJWT();
      if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    // Handle errors globally
    const { data, status } = error.response || {};
    const message = data?.message || error.message || "Something went wrong";
    const code = data?.statusCode || status || error.code || 500;
    if (status === 401) {
      window.location.href = "/login";
    }

    // we can setup refreshToken here
    return Promise.reject(new ApiError(message, code));
  }
);

export default apiClient;
