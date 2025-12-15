import { useState } from "react";
import type { User } from "../types/user.type";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Thien" },
    { id: 2, name: "Thiên đẹp trai" },
  ]);

  const addUser = (name: string) => {
    setUsers(prev => [
      ...prev,
      { id: Date.now(), name },
    ]);
  };

  const updateUser = (id: number, name: string) => {
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, name } : u))
    );
  };

  const deleteUser = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return { users, addUser, updateUser, deleteUser };
}
