
import type { LoginRequest, LoginResponse } from "../types/auth.type";
import axiosClient from "./axiosClient";

export const loginApi = async (data: LoginRequest) => {
  const res = await axiosClient.post<LoginResponse>("/auth/login", data);
  return res.data;
};

export const logoutApi = () => axiosClient.post("/api/v1/auth/logout");
