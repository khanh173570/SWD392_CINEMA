import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  AuthMetadata,
} from "../types/auth";

// Using proxy through Vite for API endpoints
const API_PATH = import.meta.env.VITE_API_PATH;
const LOGIN_ENDPOINT = `/api${API_PATH}${import.meta.env.VITE_API_AUTH_LOGIN}`;
const REGISTER_ENDPOINT = `/api${API_PATH}${
  import.meta.env.VITE_API_AUTH_REGISTER
}`;

class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export const login = async (data: LoginRequest): Promise<AuthMetadata> => {
  try {
    const response = await fetch(LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new AuthError("Failed to connect to authentication service");
    }

    const responseData: AuthResponse = await response.json();

    if (!responseData.status) {
      throw new AuthError(responseData.metadata.message || "Login failed");
    }

    const userData = responseData.metadata;

    // Store the token in localStorage
    localStorage.setItem("token", userData.accessToken);
    localStorage.setItem("refreshToken", userData.refreshToken);
    localStorage.setItem("user", JSON.stringify(userData));

    return userData;
  } catch (error) {
    console.error("Login error:", error);
    if (error instanceof AuthError) {
      throw error;
    }
    throw new AuthError("Login failed");
  }
};

export const register = async (
  data: RegisterRequest
): Promise<AuthMetadata> => {
  try {
    const response = await fetch(REGISTER_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new AuthError("Registration failed");
    }

    const responseData: AuthResponse = await response.json();

    if (!responseData.status) {
      throw new AuthError(
        responseData.metadata.message || "Registration failed"
      );
    }

    const userData = responseData.metadata;

    // Store the token in localStorage
    localStorage.setItem("token", userData.accessToken);
    localStorage.setItem("refreshToken", userData.refreshToken);
    localStorage.setItem("user", JSON.stringify(userData));

    return userData;
  } catch (error) {
    console.error("Registration error:", error);
    if (error instanceof AuthError) {
      throw error;
    }
    throw new AuthError("Registration failed");
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};
