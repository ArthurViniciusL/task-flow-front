import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Notification {
  id: string;
  message: string;
  userId: string;
  read: boolean;
  createdAt: string; // Assuming ISO date string
}

interface CreateNotificationData {
  message: string;
  userId: string;
  read?: boolean;
}

interface UpdateNotificationData {
  message?: string;
  read?: boolean;
}

export const notificationApi = {
  getAllNotifications: async (): Promise<Notification[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/notifications`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getNotificationById: async (id: string): Promise<Notification> => {
    try {
      const response = await axios.get(`${BASE_URL}/notifications/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createNotification: async (notificationData: CreateNotificationData): Promise<Notification> => {
    try {
      const response = await axios.post(`${BASE_URL}/notifications`, notificationData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateNotification: async (id: string, updateData: UpdateNotificationData): Promise<Notification> => {
    try {
      const response = await axios.put(`${BASE_URL}/notifications/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteNotification: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/notifications/${id}`);
    } catch (error) {
      throw error;
    }
  },
};
