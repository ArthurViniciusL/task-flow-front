import axios from 'axios';
import { Project } from '@/types/project';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface CreateProjectData {
  name: string;
  description?: string;
  ownerId: string; // Corresponds to createdBy in Project interface
  // members?: string[]; // If members are assigned during creation
}

interface UpdateProjectData {
  name?: string;
  description?: string;
  // members?: string[];
}

export const projectApi = {
  getAllProjects: async (): Promise<Project[]> => {
    try {
      const response = await axios.get(`${BASE_URL}/projects`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  getProjectById: async (id: string): Promise<Project> => {
    try {
      const response = await axios.get(`${BASE_URL}/projects/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  createProject: async (projectData: CreateProjectData): Promise<Project> => {
    try {
      const response = await axios.post(`${BASE_URL}/projects`, projectData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  updateProject: async (id: string, updateData: UpdateProjectData): Promise<Project> => {
    try {
      const response = await axios.put(`${BASE_URL}/projects/${id}`, updateData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  deleteProject: async (id: string): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/projects/${id}`);
    } catch (error) {
      throw error;
    }
  },
};
