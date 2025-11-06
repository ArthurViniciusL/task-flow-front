import { User } from "./user";

export interface Session {
  user: User;
  access_token: string;
  refresh_token?: string;
  expires_at?: number;
}

export type UserRole = 'admin' | 'moderator' | 'user';

export interface UserRoleData {
  user_id: string;
  role: UserRole;
}
