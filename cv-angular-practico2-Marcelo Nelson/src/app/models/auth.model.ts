export interface User {
  id: number;
  nombre: string;
  email: string;
  role: string;
  phone: string;
  image_url: string;
  last_login: string;
  created_at: string;
  updated_at: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  nombre: string;
}

export interface RegisterResponse {
  message: string;
}

export interface TokenValidationResponse {
  valid: boolean;
  user_id: number;
  role: string;
  user: User;
}

export interface ErrorResponse {
  success: false;
  error: string;
}

export interface ApiResponse<T> {
  success?: boolean;
  data?: T;
  error?: string;
}