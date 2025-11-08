import api from './api';
import { Category } from '../types/note.types';
import { ApiResponse } from '../types/api.types';

export interface CreateCategoryRequest {
  name: string;
  color?: string;
}

export interface UpdateCategoryRequest {
  name?: string;
  color?: string;
}

export const categoryService = {
  // Create a new category
  createCategory: async (data: CreateCategoryRequest): Promise<Category> => {
    const response = await api.post<ApiResponse<Category>>('/categories', data);
    return response.data.data!;
  },

  // Get all categories
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get<ApiResponse<Category[]>>('/categories');
    return response.data.data!;
  },

  // Get a specific category by ID
  getCategory: async (id: string): Promise<Category> => {
    const response = await api.get<ApiResponse<Category>>(`/categories/${id}`);
    return response.data.data!;
  },

  // Update a category
  updateCategory: async (id: string, data: UpdateCategoryRequest): Promise<Category> => {
    const response = await api.put<ApiResponse<Category>>(`/categories/${id}`, data);
    return response.data.data!;
  },

  // Delete a category
  deleteCategory: async (id: string): Promise<void> => {
    await api.delete(`/categories/${id}`);
  },
};