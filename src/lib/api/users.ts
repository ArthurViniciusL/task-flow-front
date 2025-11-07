import axios from 'axios';
import { User } from '@/types/auth';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface CreateUserData {
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'manager' | 'collaborator';
}

interface UpdateUserData {
  email?: string;
  name?: string;
  role?: 'admin' | 'manager' | 'collaborator';
  // password?: string; // Password changes might be a separate endpoint or handled differently
}

export const userApi = {
  getAllUsers: async (): Promise<User[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/users`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (id: string): Promise<User> => {
    try {
      const response = await axios.get(`${BASE_URL}/admin/users/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createUser: async (userData: CreateUserData): Promise<User> => {
    try {
      const response = await axios.post(`${BASE_URL}/admin/users`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id: string, updateData: UpdateUserData): Promise<User> => {
    try {
      const response = await axios.put(`${BASE_URL}/admin/users/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/admin/users/${id}`);
    } catch (error) {
      throw error;
    }
  },
};
