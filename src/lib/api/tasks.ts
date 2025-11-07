import axios from 'axios';
import { Task, TaskStatus, TaskPriority } from '@/types/task';
import { User } from '@/types/auth'; // Assuming User is needed for assignedTo/createdBy
import { Project } from '@/types/project'; // Assuming Project is needed for projectId

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface CreateTaskData {
  title: string;
  description?: string;
  status: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
  assignedTo?: User['id'];
  projectId?: Project['id'];
  createdBy: User['id'];
}

interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
  assignedTo?: User['id'];
  projectId?: Project['id'];
}

export const taskApi = {
  getAllTasks: async (): Promise<Task[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getTaskById: async (id: string): Promise<Task> => {
    try {
      const response = await axios.get(`${BASE_URL}/tasks/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createTask: async (taskData: CreateTaskData): Promise<Task> => {
    try {
      const response = await axios.post(`${BASE_URL}/tasks`, taskData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateTask: async (id: string, updateData: UpdateTaskData): Promise<Task> => {
    try {
      const response = await axios.put(`${BASE_URL}/tasks/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteTask: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/tasks/${id}`);
    } catch (error) {
      throw error;
    }
  },
};
