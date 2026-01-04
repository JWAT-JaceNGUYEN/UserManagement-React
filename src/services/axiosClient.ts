import axios from "axios";
import { useAuthStore } from "../store/auth.store";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: false,
});

axiosClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().accessToken;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // access token hết hạn
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = useAuthStore.getState().refreshToken;

        const res = await axios.post(
          "http://localhost:8080/api/v1/auth/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
            },
          }
        );

        // cập nhật token mới
        useAuthStore
          .getState()
          .loginSuccess(
            res.data.accessToken,
            res.data.refreshToken,
            res.data.user
          );

        // gắn lại access token mới
        originalRequest.headers.Authorization = `Bearer ${res.data.accessToken}`;

        // gọi lại request cũ
        return axiosClient(originalRequest);
      } catch (err) {
        // refresh fail → logout
        useAuthStore.getState().logout();
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosClient;
