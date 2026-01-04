import { create } from "zustand";
import type { User } from "../types/user.type";
import {
  getUsers,
  createUser,
  updateUser as apiUpdateUser,
  deleteUser as apiDeleteUser,
} from "../services/user.api";

interface UserState {
  users: User[];

  fetchUsers: () => Promise<void>;
  addUser: (user: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],

  fetchUsers: async () => {
    const data = await getUsers();
    set({ users: data });
  },

  addUser: async (user) => {
    await createUser(user);
    await get().fetchUsers();
  },

  updateUser: async (user) => {
    if (!user.id) {
      throw new Error("User id is required");
    }
    await apiUpdateUser(user);
    await get().fetchUsers();
  },

  deleteUser: async (id) => {
    await apiDeleteUser(id);
    set({
      users: get().users.filter((u) => u.id !== id),
    });
  },
}));
