import type { JSX } from "react";
import { useAuthStore } from "../store/auth.store";
import Login from "../pages/LoginPage";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const accessToken = useAuthStore((s) => s.accessToken);

  if (!accessToken) {
    return <Login />;
  }

  return children; 
}
