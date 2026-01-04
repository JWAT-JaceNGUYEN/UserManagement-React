import { create } from "zustand";
import type { UserInfo } from "../types/auth.type";
import { persist } from "zustand/middleware";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: UserInfo | null;

  loginSuccess: (
    accessToken: string,
    refreshToken: string,
    user: UserInfo
  ) => void;

  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,

      loginSuccess: (accessToken, refreshToken, user) =>
        set({ accessToken, refreshToken, user }),

      logout: () => set({ accessToken: null, refreshToken: null, user: null }),
    }),
    {
      name: "auth-storage", // key trong localStorage
    }
  )
);
