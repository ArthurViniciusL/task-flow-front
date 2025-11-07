import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface TaskCountsByStatus {
  IN_PROGRESS: number;
  DONE: number;
  TODO: number;
}

interface DashboardData {
  taskCountsByStatus: TaskCountsByStatus;
  // Add other dashboard-related data here as needed
}

export const dashboardApi = {
  getDashboardData: async (): Promise<DashboardData> => {
    try {
      const response = await axios.get(`${BASE_URL}/dashboard`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
