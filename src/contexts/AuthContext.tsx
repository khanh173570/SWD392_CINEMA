import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '../types/auth';
import { authService } from '../services/auth';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: AuthResponse | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  clearError: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authService.login(credentials);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
      
      // Redirect based on role
      redirectBasedOnRole(userData.roleName);
    } catch (err) {
      setError('Invalid username or password');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: RegisterCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authService.register(credentials);
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', userData.token);
      
      // Redirect to customer dashboard
      navigate('/customer/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Register error:', err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate('/login');
  };

  const clearError = () => {
    setError(null);
  };

  const redirectBasedOnRole = (role: string) => {
    const adminRole = import.meta.env.VITE_ROLE_ADMIN;
    const staffRole = import.meta.env.VITE_ROLE_STAFF;
    const customerRole = import.meta.env.VITE_ROLE_CUSTOMER;

    if (role === adminRole) {
      navigate('/admin/dashboard');
    } else if (role === staffRole) {
      navigate('/staff/dashboard');
    } else if (role === customerRole) {
      navigate('/customer/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};