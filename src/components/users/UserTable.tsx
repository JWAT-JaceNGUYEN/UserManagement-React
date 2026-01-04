import { useEffect, useState } from "react";
import ConfirmInline from "./ConfirmInLine";
import { useUserStore } from "../../store/user.store";

export default function UserTable() {
  const users = useUserStore((state) => state.users);
  const fetchUsers = useUserStore((state) => state.fetchUsers);
  const onUpdate = useUserStore((state) => state.updateUser);
  const onDelete = useUserStore((state) => state.deleteUser);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingUsername, setEditingUsername] = useState("");
  const [confirmId, setConfirmId] = useState<number | null>(null);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th style={{ width: 260 }}>Action</th>
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>

            <td>
              {editingId === user.id ? (
                <input
                  value={editingUsername}
                  onChange={(e) => setEditingUsername(e.target.value)}
                />
              ) : (
                user.username
              )}
            </td>

            <td>
              {/* EDIT */}
              {editingId === user.id ? (
                <button
                  className="btn success"
                  onClick={() => {
                    if (!user.id) return;
                    onUpdate({
                      id: user.id,
                      username: editingUsername,
                      email: user.email,
                    });
                    setEditingId(null);
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn"
                  onClick={() => {
                    setEditingId(user.id!);
                    setEditingUsername(user.username);
                  }}
                >
                  Edit
                </button>
              )}

              {/* DELETE */}
              {confirmId === user.id ? (
                <ConfirmInline
                  onConfirm={() => {
                    onDelete(user.id!);
                    setConfirmId(null);
                  }}
                  onCancel={() => setConfirmId(null)}
                />
              ) : (
                <button
                  className="btn danger"
                  onClick={() => setConfirmId(user.id!)}
                >
                  Delete
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
