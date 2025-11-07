import { User } from "./auth";
import { Project } from "./project";

export type TaskStatus = 'todo' | 'in-progress' | 'done' | 'backlog' | 'blocked';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string; // Using string for simplicity, can be Date or more complex later
  assignedTo?: User['id']; // User ID
  projectId?: Project['id']; // Project ID
  createdBy: User['id'];
  createdAt: Date;
  updatedAt: Date;
}
