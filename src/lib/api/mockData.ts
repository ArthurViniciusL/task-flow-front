import { Task } from "@/types/task";
import { Project } from "@/types/project";
import { User } from "@/types/user";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Implement Login Page",
    description: "Implement the login page with email and password fields, validation, and links to register and forgot password pages.",
    assignee: "1",
    status: "in_progress",
    priority: "high",
    dueDate: "2025-11-10",
    projectId: "1",
    comments: [
      { id: "1", authorId: "2", timestamp: "2025-11-01T10:00:00Z", text: "Starting to work on this." },
      { id: "2", authorId: "1", timestamp: "2025-11-01T14:30:00Z", text: "Need to clarify validation rules." },
    ],
  },
  {
    id: "2",
    title: "Design Database Schema",
    description: "Design the database schema for the TaskFlow application, including tables for users, tasks, projects, etc.",
    assignee: "2",
    status: "todo",
    priority: "high",
    dueDate: "2025-11-15",
    projectId: "1",
    comments: [],
  },
  {
    id: "3",
    title: "Setup CI/CD Pipeline",
    description: "Set up a CI/CD pipeline for automated testing and deployment of the application.",
    assignee: "3",
    status: "done",
    priority: "medium",
    dueDate: "2025-11-05",
    projectId: "1",
    comments: [],
  },
];

export const mockProjects: Project[] = [
  {
    id: "1",
    name: "TaskFlow App",
    description: "Development of the TaskFlow application, including frontend, backend, and database design.",
    progress: 70,
    status: "active",
    startDate: "2025-10-01",
    endDate: "2026-03-31",
    teamMembers: ["1", "2"],
    tasks: ["1", "2", "3"],
  },
  {
    id: "2",
    name: "Marketing Campaign",
    description: "Plan and execute Q4 marketing campaign to promote the new TaskFlow application.",
    progress: 30,
    status: "on_hold",
    startDate: "2025-12-01",
    endDate: "2026-01-31",
    teamMembers: ["2"],
    tasks: [],
  },
];

export const mockUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "admin",
    status: "Active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user",
    status: "Active",
  },
  {
    id: "3",
    name: "Peter Jones",
    email: "peter.jones@example.com",
    role: "user",
    status: "Inactive",
  },
];
