import { create } from "zustand";
import type { User } from "../types/user.type.ts";

interface UserState {
  users: User[];
  addUser: (name: string) => void;
  updateUser: (id: number, name: string) => void;
  deleteUser: (id: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  users: [
    { id: 1, name: "Thien" },
    { id: 2, name: "JWAT Student" },
  ],

  addUser: (name) =>
    set((state) => ({
      users: [...state.users, { id: Date.now(), name }],
    })),

  updateUser: (id, name) =>
    set((state) => ({
      users: state.users.map((u) =>
        u.id === id ? { ...u, name } : u
      ),
    })),

  deleteUser: (id) =>
    set((state) => ({
      users: state.users.filter((u) => u.id !== id),
    })),
}));
