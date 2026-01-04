import axios from "axios";
import type { User } from "../types/user.type";

const API_URL = "http://localhost:8080/api/v1/users";

export const getUsers = async (): Promise<User[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

export const createUser = async (user: User): Promise<User> => {
  const payload = {
    username: user.username,
    email: user.email,
  };
  const res = await axios.post(API_URL, payload);
  return res.data;
};

export const updateUser = async (user: User): Promise<User> => {
  if (!user.id) {
    throw new Error("User id is required for update");
  }

  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };

  const res = await axios.put(API_URL, payload);
  return res.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};
