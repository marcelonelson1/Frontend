import api from './api';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
}

export const authService = {
  // Login
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);

    if (response.data.success && response.data.data) {
      // Guardar token en localStorage
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return response.data.data;
    }

    throw new Error(response.data.message || 'Error en el login');
  },

  // Register
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', data);

    if (response.data.success && response.data.data) {
      // Guardar token en localStorage
      localStorage.setItem('token', response.data.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
      return response.data.data;
    }

    throw new Error(response.data.message || 'Error en el registro');
  },

  // Get current user
  getCurrentUser: async () => {
    const response = await api.get<ApiResponse<{ id: string; username: string; email: string }>>('/auth/me');
    return response.data.data;
  },

  // Logout
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  },

  // Get stored user
  getStoredUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  // Get token
  getToken: (): string | null => {
    return localStorage.getItem('token');
  },
};
