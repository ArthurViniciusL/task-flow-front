import { mockTasks, mockProjects, mockUsers } from "./mockData";
import { Task } from "@/types/task";
import { Project } from "@/types/project";
import { User } from "@/types/user";

// Simulate API call delay
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const mockApi = {
  auth: {
    login: async (email: string, password: string): Promise<{ token: string; user: User }> => {
      await delay(500);
      const user = mockUsers.find((u) => u.email === email);
      if (user && password === "password") { // Simplified password check
        return { token: "mock-token", user };
      }
      throw new Error("Invalid credentials");
    },
    register: async (email: string, password: string, name: string): Promise<{ token: string; user: User }> => {
      await delay(500);
      if (mockUsers.some((u) => u.email === email)) {
        throw new Error("User with this email already exists");
      }
      const newUser: User = {
        id: String(mockUsers.length + 1),
        name,
        email,
        role: "user", // Default role
        status: "Active",
      };
      mockUsers.push(newUser);
      return { token: "mock-token", user: newUser };
    },
  },

  tasks: {
    getAll: async (): Promise<Task[]> => {
      await delay(300);
      return mockTasks;
    },
    getById: async (id: string): Promise<Task | undefined> => {
      await delay(300);
      return mockTasks.find((task) => task.id === id);
    },
    create: async (task: Omit<Task, "id">): Promise<Task> => {
      await delay(300);
      const newTask = { ...task, id: String(mockTasks.length + 1) };
      mockTasks.push(newTask);
      return newTask;
    },
    update: async (id: string, updatedTask: Partial<Task>): Promise<Task> => {
      await delay(300);
      const index = mockTasks.findIndex((task) => task.id === id);
      if (index > -1) {
        mockTasks[index] = { ...mockTasks[index], ...updatedTask };
        return mockTasks[index];
      }
      throw new Error("Task not found");
    },
    remove: async (id: string): Promise<void> => {
      await delay(300);
      const index = mockTasks.findIndex((task) => task.id === id);
      if (index > -1) {
        mockTasks.splice(index, 1);
        return;
      }
      throw new Error("Task not found");
    },
  },

  projects: {
    getAll: async (): Promise<Project[]> => {
      await delay(300);
      return mockProjects;
    },
    getById: async (id: string): Promise<Project | undefined> => {
      await delay(300);
      return mockProjects.find((project) => project.id === id);
    },
    create: async (project: Omit<Project, "id">): Promise<Project> => {
      await delay(300);
      const newProject = { ...project, id: String(mockProjects.length + 1) };
      mockProjects.push(newProject);
      return newProject;
    },
    update: async (id: string, updatedProject: Partial<Project>): Promise<Project> => {
      await delay(300);
      const index = mockProjects.findIndex((project) => project.id === id);
      if (index > -1) {
        mockProjects[index] = { ...mockProjects[index], ...updatedProject };
        return mockProjects[index];
      }
      throw new Error("Project not found");
    },
    remove: async (id: string): Promise<void> => {
      await delay(300);
      const index = mockProjects.findIndex((project) => project.id === id);
      if (index > -1) {
        mockProjects.splice(index, 1);
        return;
      }
      throw new Error("Project not found");
    },
  },

  users: {
    getAll: async (): Promise<User[]> => {
      await delay(300);
      return mockUsers;
    },
    getById: async (id: string): Promise<User | undefined> => {
      await delay(300);
      return mockUsers.find((user) => user.id === id);
    },
  },
};
