import apiClient from "@/utils/axios";
import secureLocalStorage from "react-secure-storage";
import { ILogin } from "./dto";

export function getJWT() {
  return secureLocalStorage.getItem("accessToken");
}

export function getUserLocal() {
  return secureLocalStorage.getItem("user");
}

export const login = async (loginData: ILogin) => {
  const {
    data: { payload: data },
  } = await apiClient.post("/agent/auth/login", loginData);
  
  secureLocalStorage.setItem("user", data.user);
  secureLocalStorage.setItem("expiresIn", data.expires_in);
  secureLocalStorage.setItem("expiresAt", data.expires_at);
  secureLocalStorage.setItem("accessToken", data.access_token);
  secureLocalStorage.setItem("refreshToken", data.refresh_token);

  return data;
};

export function logout() {
  secureLocalStorage.removeItem("user");
  secureLocalStorage.removeItem("expiresAt");
  secureLocalStorage.removeItem("expiresIn");
  secureLocalStorage.removeItem("accessToken");
  secureLocalStorage.removeItem("refreshToken");

  return null;
}
 
