export type ProjectStatus = 'active' | 'completed' | 'on_hold' | 'cancelled';

export interface Project {
  id: string;
  name: string;
  description?: string;
  progress: number;
  status: ProjectStatus;
  startDate: string;
  endDate: string;
  teamMembers: string[]; // Array of user IDs
  tasks: string[]; // Array of task IDs
}
