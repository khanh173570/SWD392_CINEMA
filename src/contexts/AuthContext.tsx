import React, { createContext, useState, useEffect } from "react";
import { AuthResponse } from "../types/auth";
import * as authService from "../services/auth";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: AuthResponse | null;
  loading: boolean;
  error: string | null;
  login: (credentials: { userName: string; password: string }) => Promise<void>;
  register: (credentials: {
    userName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  clearError: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const currentUser = JSON.parse(userStr);
        setUser(currentUser);
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials: { userName: string; password: string }) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authService.login(credentials);
      setUser(userData);

      // Redirect based on role
      redirectBasedOnRole(userData.roleName);
    } catch (err) {
      setError("Invalid username or password");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: {
    userName: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const registerData = {
        ...credentials,
        roleName: import.meta.env.VITE_ROLE_CUSTOMER,
      };
      const userData = await authService.register(registerData);
      setUser(userData);

      // Redirect to customer dashboard
      navigate("/customer/dashboard");
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    navigate("/login");
  };

  const clearError = () => {
    setError(null);
  };

  const redirectBasedOnRole = (role: string) => {
    const adminRole = import.meta.env.VITE_ROLE_ADMIN;
    const staffRole = import.meta.env.VITE_ROLE_STAFF;
    const customerRole = import.meta.env.VITE_ROLE_CUSTOMER;

    if (role === adminRole) {
      navigate("/admin/dashboard");
    } else if (role === staffRole) {
      navigate("/staff/dashboard");
    } else if (role === customerRole) {
      navigate("/customer/dashboard");
    } else {
      navigate("/login");
    }
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
