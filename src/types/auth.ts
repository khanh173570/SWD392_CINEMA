export type RoleName = "admin" | "staff" | "customer";

export interface User {
  id: string;
  userName: string;
}

export interface AuthResponse {
  id: string;
  userName: string;
  password: string;
  roleName: RoleName;
  token: string;
  user: User;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  email: string;
  roleName: RoleName;
}
