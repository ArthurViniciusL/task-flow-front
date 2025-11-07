import { Task, TaskStatus } from "@/types/task";
import { User } from "@/types/auth";
import { Project } from "@/types/project";
import { Comment } from "@/types/comment";
import { mockUsers, mockProjects, mockComments, getMockTasks, setMockTasks } from "./mockData";

// Simula delay de API
const delay = (ms: number = 500) => new Promise(resolve => setTimeout(resolve, ms));

// Auth API
export const authApi = {
  register: async (email: string): Promise<{ success: boolean; message?: string }> => {
    await delay();
    if (mockUsers.some(user => user.email === email)) {
      return { success: false, message: "Este e-mail já está em uso." };
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      email,
      name: email.split('@')[0], // Simple name from email
      role: "collaborator", // Default role for new registrations
    };
    mockUsers.push(newUser);
    console.log("New user registered:", newUser);
    return { success: true, message: "Registro realizado com sucesso!" };
  },

  login: async (email: string): Promise<{ success: boolean; token?: string; message?: string }> => {
    await delay();
    const user = mockUsers.find(u => u.email === email);
    if (!user) {
      return { success: false, message: "Credenciais inválidas." };
    }
    // For mock, any password works if user exists
    // In a real app, you'd compare hashed passwords
    const mockPasswordMatch = true; // Simulate password match

    if (mockPasswordMatch) {
      // Simulate JWT token
      const token = `mock-jwt-${user.id}-${Date.now()}`;
      return { success: true, token };
    } else {
      return { success: false, message: "Credenciais inválidas." };
    }
  },

  requestPasswordReset: async (email: string): Promise<{ success: boolean; message?: string }> => {
    await delay();
    const userExists = mockUsers.some(user => user.email === email);
    if (userExists) {
      console.log(`Simulating password reset email sent to ${email}`);
      return { success: true, message: "Se o e-mail estiver registrado, um link de redefinição foi enviado." };
    } else {
      // For security, always return a generic success message even if user doesn't exist
      return { success: true, message: "Se o e-mail estiver registrado, um link de redefinição foi enviado." };
    }
  },
};

// Comments API
export const commentApi = {
  getByTaskId: async (taskId: string): Promise<Comment[]> => {
    await delay();
    return mockComments.filter(comment => comment.taskId === taskId).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  },

  add: async (comment: Omit<Comment, 'id' | 'createdAt'>): Promise<Comment> => {
    await delay();
    const newComment: Comment = {
      ...comment,
      id: `comment-${Date.now()}`,
      createdAt: new Date(),
    };
    mockComments.push(newComment);
    return newComment;
  },
};

// Tasks API
export const taskApi = {
  getAll: async (): Promise<Task[]> => {
    await delay();
    return getMockTasks();
  },

  getById: async (id: string): Promise<Task | undefined> => {
    await delay();
    return getMockTasks().find(task => task.id === id);
  },

  create: async (task: Omit<Task, 'id' | 'createdAt'>): Promise<Task> => {
    await delay();
    const newTask: Task = {
      ...task,
      id: `task-${Date.now()}`,
      createdAt: new Date(),
    };
    setMockTasks([...getMockTasks(), newTask]);
    return newTask;
  },

  update: async (id: string, updates: Partial<Task>): Promise<Task | undefined> => {
    await delay();
    const currentTasks = getMockTasks();
    const index = currentTasks.findIndex(task => task.id === id);
    if (index !== -1) {
      const updatedTask = { ...currentTasks[index], ...updates };
      const newTasks = [...currentTasks];
      newTasks[index] = updatedTask;
      setMockTasks(newTasks);
      return updatedTask;
    }
    return undefined;
  },

  delete: async (id: string): Promise<boolean> => {
    await delay();
    const currentTasks = getMockTasks();
    const initialLength = currentTasks.length;
    const newTasks = currentTasks.filter(task => task.id !== id);
    setMockTasks(newTasks);
    return newTasks.length < initialLength;
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

  delete: async (id: string): Promise<boolean> => {
    await delay();
    const index = mockProjects.findIndex(project => project.id === id);
    if (index !== -1) {
      mockProjects.splice(index, 1);
      // Also remove tasks associated with this project for data integrity
      setMockTasks(getMockTasks().filter(task => task.projectId !== id));
      return true;
    }
    return false;
  },
};

// Users API (read-only para MVP)
export const userApi = {
  getAll: async (): Promise<User[]> => {
    await delay();
    return [...mockUsers];
  },

  getById: async (id: string): Promise<User | undefined> => {
    await delay();
    return mockUsers.find(user => user.id === id);
  },

  update: async (id: string, updates: Partial<User>): Promise<User | undefined> => {
    await delay();
    const index = mockUsers.findIndex(user => user.id === id);
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...updates };
      return mockUsers[index];
    }
    return undefined;
  },
};
