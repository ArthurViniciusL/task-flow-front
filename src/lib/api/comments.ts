import axios from 'axios';
import { Comment } from '@/types/comment';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface CreateCommentData {
  content: string;
  userId: string;
}

interface UpdateCommentData {
  content: string;
}

export const commentApi = {
  getCommentsByTaskId: async (taskId: string): Promise<Comment[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks/${taskId}/comments`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getCommentById: async (taskId: string, commentId: string): Promise<Comment> => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks/${taskId}/comments/${commentId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createComment: async (taskId: string, commentData: CreateCommentData): Promise<Comment> => {
    try {
      const response = await axios.post(`${BASE_URL}/tasks/${taskId}/comments`, commentData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateComment: async (taskId: string, commentId: string, updateData: UpdateCommentData): Promise<Comment> => {
    try {
      const response = await axios.put(`${BASE_URL}/tasks/${taskId}/comments/${commentId}`, updateData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteComment: async (taskId: string, commentId: string): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/tasks/${taskId}/comments/${commentId}`);
    } catch (error) {
      throw error;
    }
  },
};
