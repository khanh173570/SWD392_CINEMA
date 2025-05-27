import { AuthResponse, LoginRequest, RegisterRequest } from "../types/auth";

const AUTH_ENDPOINT = `${import.meta.env.VITE_API_URL}/login`;

class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "AuthError";
  }
}

export const login = async (data: LoginRequest): Promise<AuthResponse> => {
  try {
    const response = await fetch(
      `${AUTH_ENDPOINT}?userName=${data.userName}&password=${data.password}`
    );

    if (!response.ok) {
      throw new AuthError("Failed to connect to authentication service");
    }

    const users = await response.json();
    const user = users.find(
      (u: AuthResponse) =>
        u.userName === data.userName && u.password === data.password
    );

    if (!user) {
      throw new AuthError("Invalid credentials");
    }

    // Validate role
    const validRoles = ["admin", "staff", "customer"];
    if (!validRoles.includes(user.roleName)) {
      throw new AuthError("Invalid user role");
    }

    // Store the token in localStorage
    localStorage.setItem("token", user.token);
    localStorage.setItem("user", JSON.stringify(user));

    return user;
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
): Promise<AuthResponse> => {
  try {
    // Generate a random ID for the user
    const userId = Date.now().toString();

    const newUser = {
      ...data,
      token: `mock-token-${userId}`,
      id: userId,
      user: {
        id: userId,
        userName: data.userName,
      },
    };

    const response = await fetch(AUTH_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new AuthError("Registration failed");
    }

    const user = await response.json();

    // Store the token in localStorage
    localStorage.setItem("token", user.token);
    localStorage.setItem("user", JSON.stringify(user));

    return user;
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
  localStorage.removeItem("user");
};
