export interface Project {
  id: string;
  name: string;
  description?: string;
  createdBy: string; // User ID
  members: string[]; // Array of User IDs
  createdAt: Date;
  updatedAt?: Date;
}
