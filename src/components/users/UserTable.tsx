import { useState } from "react";
import type { User } from "../../types/user.type";
import ConfirmInline from "./ConfirmInLine";

interface Props {
  users: User[];
  onUpdate: (id: number, name: string) => void;
  onDelete: (id: number) => void;
}

export default function UserTable({ users, onUpdate, onDelete }: Props) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState("");
  const [confirmId, setConfirmId] = useState<number | null>(null);

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>User Name</th>
          <th style={{ width: 260 }}>Action</th>
        </tr>
      </thead>

      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>

            <td>
              {editingId === user.id ? (
                <input
                  value={editingName}
                  onChange={e => setEditingName(e.target.value)}
                />
              ) : (
                user.name
              )}
            </td>

            <td>
              {/* EDIT */}
              {editingId === user.id ? (
                <button
                  className="btn success"
                  onClick={() => {
                    onUpdate(user.id, editingName);
                    setEditingId(null);
                  }}
                >
                  Save
                </button>
              ) : (
                <button
                  className="btn"
                  onClick={() => {
                    setEditingId(user.id);
                    setEditingName(user.name);
                  }}
                >
                  Edit
                </button>
              )}

              {/* DELETE */}
              {confirmId === user.id ? (
                <ConfirmInline
                  onConfirm={() => {
                    onDelete(user.id);
                    setConfirmId(null);
                  }}
                  onCancel={() => setConfirmId(null)}
                />
              ) : (
                <button
                  className="btn danger"
                  onClick={() => setConfirmId(user.id)}
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
