

import { useAuthStore } from "../store/auth.store";
import type { LoginRequest } from "../types/auth.type";
import { loginApi } from "./api.auth";
import axiosClient from "./axiosClient";

export const login = async (data: LoginRequest) => {
  const res = await loginApi(data);
  useAuthStore
    .getState()
    .loginSuccess(res.accessToken, res.refreshToken, res.user);
  return res;
};


export const logout = async () => {
  const refreshToken = useAuthStore.getState().refreshToken;

  try {
    await axiosClient.post(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      }
    );
  } finally {
    useAuthStore.getState().logout();
    window.location.href = "/login";
  }
};