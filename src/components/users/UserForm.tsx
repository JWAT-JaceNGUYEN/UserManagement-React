import { useEffect, useState } from "react";
import { createUser, updateUser } from "../../services/user.api";
import type { User } from "../../types/user.type";

export default function UserForm({
  editingUser,
  onSuccess,
}: {
  editingUser?: User | null;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState<User>({
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (editingUser) {
      setForm({
        id: editingUser.id,
        username: editingUser.username,
        email: editingUser.email,
      });
    } else {
      setForm({ username: "", email: "" });
    }
  }, [editingUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.username || !form.email) {
      setError("Username and email are required");
      return;
    }

    try {
      setLoading(true);
      if (form.id) {
        await updateUser(form);
      } else {
        await createUser(form);
      }
      onSuccess();
    } catch (err) {
      setError("Failed to save user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{form.id ? "Edit User" : "Create User"}</h3>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        disabled={loading}
      />

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        disabled={loading}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Saving..." : form.id ? "Update" : "Create"}
      </button>
    </form>
  );
}
