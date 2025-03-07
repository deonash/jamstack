export type UserRole = 'admin' | 'studio' | 'guest';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
} 