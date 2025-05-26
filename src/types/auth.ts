export interface User {
  id: string;
  userName: string;
}

export interface AuthResponse {
  id: string;
  userName: string;
  password?: string;
  roleName: string;
  token: string;
  user: User;
}

export interface LoginCredentials {
  userName: string;
  password: string;
}

export interface RegisterCredentials {
  userName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}