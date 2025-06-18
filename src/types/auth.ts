export type RoleName =
  | "ROLE_ADMIN"
  | "ROLE_STAFF"
  | "ROLE_USER"
  | "ROLE_MANAGER";

export interface User {
  id: number;
  email: string;
  fullName: string;
  avatar: string;
  phone: string;
  roles: RoleName[];
}

export interface AuthMetadata {
  id: number;
  email: string;
  fullName: string;
  avatar: string;
  phone: string;
  provider: string;
  accessToken: string;
  refreshToken: string;
  roles: RoleName[];
  message: string | null;
}

export interface AuthResponse {
  metadata: AuthMetadata;
  status: boolean;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone: string;
}
