import { useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { loginApi } from "../services/api.auth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const loginSuccess = useAuthStore((s) => s.loginSuccess);

  const handleLogin = async () => {
    try {
      const res = await loginApi({ username, password });
      loginSuccess(res.accessToken, res.refreshToken, res.user);
      alert("Login thành công");
    } catch (err) {
      alert("Sai username hoặc password");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
