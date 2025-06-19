import React, { createContext, useState, useEffect, useCallback } from "react";
import {
  AuthMetadata,
  LoginRequest,
  RegisterRequest,
  RoleName,
} from "../types/auth";
import * as authService from "../services/auth";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: AuthMetadata | null;
  loading: boolean;
  error: string | null;
  activeRole: RoleName | null;
  availableRoles: RoleName[];
  login: (credentials: LoginRequest) => Promise<void>;
  register: (credentials: RegisterRequest) => Promise<void>;
  logout: () => void;
  switchRole: (role: RoleName) => void;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: false,
  error: null,
  activeRole: null,
  availableRoles: [],
  login: async () => {},
  register: async () => {},
  logout: () => {},
  switchRole: () => {},
  clearError: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthMetadata | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeRole, setActiveRole] = useState<RoleName | null>(null);
  const [availableRoles, setAvailableRoles] = useState<RoleName[]>([]);
  const navigate = useNavigate();

  // Helper function to determine the highest priority role
  const getHighestPriorityRole = useCallback((roles: RoleName[]): RoleName => {
    // Role priority order (highest to lowest)
    const rolePriority: RoleName[] = [
      "ROLE_ADMIN",
      "ROLE_MANAGER",
      "ROLE_STAFF",
      "ROLE_USER",
    ];

    // Find the first role in the priority list that exists in the user's roles
    for (const role of rolePriority) {
      if (roles.includes(role)) {
        return role;
      }
    }

    // Default to the first role if none match priority list
    return roles[0];
  }, []);

  // Redirect based on a specific role
  const redirectBasedOnRole = useCallback(
    (role: RoleName) => {
      switch (role) {
        case "ROLE_ADMIN":
          navigate("/admin/dashboard");
          break;
        case "ROLE_MANAGER":
          navigate("/manager/dashboard");
          break;
        case "ROLE_STAFF":
          navigate("/staff/dashboard");
          break;
        case "ROLE_USER":
          navigate("/customer/dashboard");
          break;
        default:
          navigate("/login");
      }
    },
    [navigate]
  );

  useEffect(() => {
    // Check if user is already logged in
    const userStr = localStorage.getItem("user");
    const activeRoleStr = localStorage.getItem("activeRole");

    if (userStr) {
      try {
        const currentUser = JSON.parse(userStr);
        setUser(currentUser);

        // Set available roles from user data
        if (currentUser.roles && Array.isArray(currentUser.roles)) {
          setAvailableRoles(currentUser.roles as RoleName[]);

          // Set active role from localStorage or use first role from list
          if (activeRoleStr && currentUser.roles.includes(activeRoleStr)) {
            setActiveRole(activeRoleStr as RoleName);
            // Redirect to the appropriate dashboard if no path is specified (e.g., just loaded the app)
            if (window.location.pathname === "/") {
              redirectBasedOnRole(activeRoleStr as RoleName);
            }
          } else if (currentUser.roles.length > 0) {
            const defaultRole = currentUser.roles[0] as RoleName;
            setActiveRole(defaultRole);
            localStorage.setItem("activeRole", defaultRole);
            // Redirect to the appropriate dashboard if no path is specified
            if (window.location.pathname === "/") {
              redirectBasedOnRole(defaultRole);
            }
          }
        }
      } catch {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("activeRole");
      }
    }
    setLoading(false);
  }, [navigate, redirectBasedOnRole]);

  const login = async (credentials: LoginRequest) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await authService.login(credentials);
      setUser(userData);
      if (
        userData.roles &&
        Array.isArray(userData.roles) &&
        userData.roles.length > 0
      ) {
        // Set available roles
        setAvailableRoles(userData.roles as RoleName[]);

        // Set active role to the first role in the array
        const firstRole = userData.roles[0] as RoleName;
        setActiveRole(firstRole);
        localStorage.setItem("activeRole", firstRole);

        // Redirect based on the active role
        redirectBasedOnRole(firstRole);
      } else {
        throw new Error("No valid roles found for this user");
      }
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

      if (
        userData.roles &&
        Array.isArray(userData.roles) &&
        userData.roles.length > 0
      ) {
        // Default role for new registrations is usually ROLE_USER
        setAvailableRoles(userData.roles as RoleName[]);
        const defaultRole = userData.roles[0] as RoleName;
        setActiveRole(defaultRole);
        localStorage.setItem("activeRole", defaultRole);

        // New users typically go to customer dashboard
        navigate("/customer/dashboard");
      } else {
        throw new Error("No valid roles found for this user");
      }
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
    setActiveRole(null);
    setAvailableRoles([]);
    localStorage.removeItem("activeRole");
    navigate("/login");
  };

  const clearError = () => {
    setError(null);
  };

  // Function to switch to a different role
  const switchRole = (role: RoleName) => {
    if (user && availableRoles.includes(role)) {
      setActiveRole(role);
      localStorage.setItem("activeRole", role);
      redirectBasedOnRole(role);
    }
  };

  const contextValue: AuthContextType = {
    user,
    loading,
    error,
    activeRole,
    availableRoles,
    login,
    register,
    logout,
    switchRole,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
