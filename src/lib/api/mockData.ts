import { Task, Project, TaskStatus, TaskPriority } from "@/types/task";
import { User } from "@/types/auth";

// Mock Users
export const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@taskflow.com",
    name: "Admin User",
    role: "admin",
  },
  {
    id: "2",
    email: "gerente@taskflow.com",
    name: "Gerente Silva",
    role: "manager",
  },
  {
    id: "3",
    email: "colaborador@taskflow.com",
    name: "João Santos",
    role: "collaborator",
  },
  {
    id: "4",
    email: "maria@taskflow.com",
    name: "Maria Oliveira",
    role: "collaborator",
  },
];

// Mock Projects
export const mockProjects: Project[] = [
  {
    id: "proj-1",
    name: "Website Redesign",
    description: "Redesenhar o website corporativo com nova identidade visual",
    createdBy: "2",
    members: ["2", "3", "4"],
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "proj-2",
    name: "API Development",
    description: "Desenvolver nova API RESTful para integração com parceiros",
    createdBy: "2",
    members: ["2", "3"],
    createdAt: new Date("2024-02-01"),
  },
];

// Mock Tasks
export const mockTasks: Task[] = [
  {
    id: "task-1",
    title: "Criar wireframes da homepage",
    description: "Desenvolver wireframes de baixa fidelidade para a nova homepage",
    assignedTo: "3",
    status: "in_progress",
    priority: "high",
    dueDate: new Date("2024-12-15"),
    projectId: "proj-1",
    createdBy: "2",
    createdAt: new Date("2024-11-01"),
  },
  {
    id: "task-2",
    title: "Implementar autenticação JWT",
    description: "Configurar sistema de autenticação usando JSON Web Tokens",
    assignedTo: "3",
    status: "todo",
    priority: "urgent",
    dueDate: new Date("2024-12-10"),
    projectId: "proj-2",
    createdBy: "2",
    createdAt: new Date("2024-11-05"),
  },
  {
    id: "task-3",
    title: "Revisar documentação da API",
    description: "Atualizar documentação com novos endpoints",
    assignedTo: "4",
    status: "done",
    priority: "medium",
    dueDate: new Date("2024-11-30"),
    projectId: "proj-2",
    createdBy: "2",
    createdAt: new Date("2024-10-20"),
  },
  {
    id: "task-4",
    title: "Design do sistema de componentes",
    description: "Criar biblioteca de componentes UI reutilizáveis",
    assignedTo: "4",
    status: "in_progress",
    priority: "high",
    dueDate: new Date("2024-12-20"),
    projectId: "proj-1",
    createdBy: "2",
    createdAt: new Date("2024-11-10"),
  },
  {
    id: "task-5",
    title: "Testes de integração",
    description: "Escrever testes para novos endpoints da API",
    assignedTo: "3",
    status: "todo",
    priority: "medium",
    dueDate: new Date("2024-12-18"),
    projectId: "proj-2",
    createdBy: "2",
    createdAt: new Date("2024-11-12"),
  },
];

// Helper functions
export const getTasksByStatus = (status: TaskStatus): Task[] => {
  return mockTasks.filter(task => task.status === status);
};

export const getTasksByProject = (projectId: string): Task[] => {
  return mockTasks.filter(task => task.projectId === projectId);
};

export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};

export const getProjectById = (projectId: string): Project | undefined => {
  return mockProjects.find(project => project.id === projectId);
};
