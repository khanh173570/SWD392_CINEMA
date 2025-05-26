import api from './api';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '../types/auth';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.get('/login');
      const users = response.data as AuthResponse[];
      
      const user = users.find(
        (u) => u.userName === credentials.userName && u.password === credentials.password
      );
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },
  
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    try {
      // First register the user
      const registerResponse = await api.post('/register', {
        userName: credentials.userName,
        email: credentials.email,
        password: credentials.password,
        roleName: import.meta.env.VITE_ROLE_CUSTOMER, // Default role for new users
        token: `mock-token-${Date.now()}`,
        user: {
          id: Date.now().toString(),
          userName: credentials.userName
        }
      });
      
      // Then add the user to the login API
      await api.post('/login', {
        userName: credentials.userName,
        password: credentials.password,
        roleName: import.meta.env.VITE_ROLE_CUSTOMER,
        token: registerResponse.data.token,
        user: registerResponse.data.user
      });
      
      return registerResponse.data;
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },
  
  logout: (): void => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  },
  
  getCurrentUser: (): AuthResponse | null => {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;
    
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing user from localStorage:', error);
      return null;
    }
  }
};