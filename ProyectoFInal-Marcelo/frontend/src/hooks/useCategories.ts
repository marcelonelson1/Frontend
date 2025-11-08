import { useQuery, useMutation, useQueryClient } from 'react-query';
import { categoryService, CreateCategoryRequest, UpdateCategoryRequest } from '../services/categoryService';
import toast from 'react-hot-toast';

export const useCategories = () => {
  return useQuery(
    ['categories'],
    () => categoryService.getCategories(),
    {
      staleTime: 300000, // 5 minutes
    }
  );
};

export const useCategory = (id: string) => {
  return useQuery(
    ['category', id],
    () => categoryService.getCategory(id),
    {
      enabled: !!id,
    }
  );
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: CreateCategoryRequest) => categoryService.createCategory(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['categories']);
        toast.success('Category created successfully! 🏷️');
      },
    }
  );
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data }: { id: string; data: UpdateCategoryRequest }) =>
      categoryService.updateCategory(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['categories']);
        queryClient.invalidateQueries(['category']);
        toast.success('Category updated successfully! ✏️');
      },
    }
  );
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => categoryService.deleteCategory(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['categories']);
        toast.success('Category deleted successfully! 🗑️');
      },
    }
  );
};