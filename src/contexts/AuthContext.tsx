import React, { createContext, useState, useEffect } from "react";
import { AuthMetadata, LoginRequest, RegisterRequest } from "../types/auth";
import * as authService from "../services/auth";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: AuthMetadata | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  register: (credentials: RegisterRequest) => Promise<void>;
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
  const [user, setUser] = useState<AuthMetadata | null>(null);
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
  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authService.login(credentials);
      setUser(userData);

      // Redirect based on roles
      redirectBasedOnRoles(userData.roles);
    } catch (err) {
      setError("Invalid email or password");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (credentials: RegisterRequest) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authService.register(credentials);
      setUser(userData);

      // Redirect to user dashboard
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
  const redirectBasedOnRoles = (roles: string[]) => {
    if (roles.includes("ROLE_ADMIN")) {
      navigate("/admin/dashboard");
    } else if (roles.includes("ROLE_MANAGER")) {
      navigate("/manager/dashboard");
    } else if (roles.includes("ROLE_STAFF")) {
      navigate("/staff/dashboard");
    } else if (roles.includes("ROLE_USER")) {
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
