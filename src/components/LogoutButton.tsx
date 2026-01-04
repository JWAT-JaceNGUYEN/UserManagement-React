import { logoutApi } from "../services/api.auth";
import { useAuthStore } from "../store/auth.store";

export default function LogoutButton() {
  const logout = useAuthStore((s) => s.logout);

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch (e) {
      console.warn("Logout API failed");
    } finally {
      logout();
    }
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: "6px 12px",
        background: "#e74c3c",
        color: "#fff",
        border: "none",
        borderRadius: 4,
        cursor: "pointer",
      }}
    >
      Logout
    </button>
  );
}
