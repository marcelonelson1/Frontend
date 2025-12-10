export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  message: string;
  data: T[];
  meta: {
    total: number;
    limit: number;
    offset: number;
  };
}

export interface ErrorResponse {
  success: boolean;
  message: string;
  error?: string;
}