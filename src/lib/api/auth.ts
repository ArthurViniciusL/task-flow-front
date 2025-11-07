import axios from 'axios';
import { RegisterData, User } from '@/types/auth'; // Assuming User is the response type for login/register

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: User; // Assuming the API returns user data along with the token
}

export const authApi = {
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
      return response.data;
    } catch (error) {
      // Handle error, e.g., throw new Error(error.response.data.message);
      throw error;
    }
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      // Handle error
      throw error;
    }
  },
};
