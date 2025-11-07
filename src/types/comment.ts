export interface Comment {
  id: string;
  taskId: string;
  userId: string;
  userName: string; // Denormalized for easier display
  content: string;
  createdAt: Date;
}
