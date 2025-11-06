export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Comment {
  id: string;
  authorId: string;
  timestamp: string;
  text: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: string; // Changed from assigned_to to assignee to match mock data
  projectId?: string; // Changed from project_id to projectId to match mock data
  created_by?: string;
  created_at?: string;
  updated_at?: string;
  dueDate?: string; // Changed from due_date to dueDate to match mock data
  comments?: Comment[];
}
