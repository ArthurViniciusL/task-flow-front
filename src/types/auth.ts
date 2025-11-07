export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager' | 'collaborator';
}

export interface RegisterData {
  email: string;
  password: string;
}
