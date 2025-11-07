import { Task, Project, TaskStatus } from "@/types/task";
import { mockTasks, mockProjects, mockUsers } from "./mockData";

// Simula delay de API
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Tasks API
export const taskApi = {
  getAll: async (): Promise<Task[]> => {
    await delay();
    return [...mockTasks];
  },

  getById: async (id: string): Promise<Task | undefined> => {
    await delay();
    return mockTasks.find(task => task.id === id);
  },

  create: async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
    await delay();
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date(),
    };
    mockTasks.push(newTask);
    return newTask;
  },

  update: async (id: string, updates: Partial<Task>): Promise<Task | undefined> => {
    await delay();
    const index = mockTasks.findIndex(task => task.id === id);
    if (index !== -1) {
      mockTasks[index] = { ...mockTasks[index], ...updates };
      return mockTasks[index];
    }
    return undefined;
  },

  delete: async (id: string): Promise<boolean> => {
    await delay();
    const index = mockTasks.findIndex(task => task.id === id);
    if (index !== -1) {
      mockTasks.splice(index, 1);
      return true;
    }
    return false;
  },

  updateStatus: async (id: string, status: TaskStatus): Promise<Task | undefined> => {
    return taskApi.update(id, { status });
  },
};

// Projects API
export const projectApi = {
  getAll: async (): Promise<Project[]> => {
    await delay();
    return [...mockProjects];
  },

  getById: async (id: string): Promise<Project | undefined> => {
    await delay();
    return mockProjects.find(project => project.id === id);
  },

  create: async (project: Omit<Project, 'id' | 'createdAt'>): Promise<Project> => {
    await delay();
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      createdAt: new Date(),
    };
    mockProjects.push(newProject);
    return newProject;
  },

  update: async (id: string, updates: Partial<Project>): Promise<Project | undefined> => {
    await delay();
    const index = mockProjects.findIndex(project => project.id === id);
    if (index !== -1) {
      mockProjects[index] = { ...mockProjects[index], ...updates };
      return mockProjects[index];
    }
    return undefined;
  },
};

// Users API (read-only para MVP)
export const userApi = {
  getAll: async () => {
    await delay();
    return [...mockUsers];
  },

  getById: async (id: string) => {
    await delay();
    return mockUsers.find(user => user.id === id);
  },
};
