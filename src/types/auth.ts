export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
}

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
