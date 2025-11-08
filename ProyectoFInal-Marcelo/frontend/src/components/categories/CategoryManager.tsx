import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, TagIcon } from '@heroicons/react/24/outline';
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from '../../hooks/useCategories';
import { Category } from '../../types/note.types';
import CategoryBadge from './CategoryBadge';
import Modal from '../common/Modal';
import toast from 'react-hot-toast';

interface CategoryFormData {
  name: string;
  color: string;
}

const CategoryManager: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState<CategoryFormData>({ name: '', color: '#6366f1' });

  const { data: categories = [], isLoading } = useCategories();
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();

  const colorOptions = [
    '#6366f1', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6', 
    '#06b6d4', '#f97316', '#ec4899', '#84cc16', '#64748b'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast.error('Please enter a tag name');
      return;
    }

    try {
      if (editingCategory) {
        await updateMutation.mutateAsync({
          id: editingCategory.id,
          data: formData
        });
        toast.success('✨ Tag updated successfully!');
        setEditingCategory(null);
      } else {
        await createMutation.mutateAsync(formData);
        toast.success('🎉 Tag created successfully!');
        setIsCreateModalOpen(false);
      }
      setFormData({ name: '', color: '#6366f1' });
    } catch (error: any) {
      toast.error(error.message || 'Oops! Something went wrong. Please try again.');
    }
  };

  const handleEdit = (category: Category) => {
    setFormData({ name: category.name, color: category.color });
    setEditingCategory(category);
  };

  const handleDelete = async (category: Category) => {
    if (window.confirm(`Are you sure you want to delete the "${category.name}" tag?\n\nThis will remove it from all your notes, but your notes will remain safe.`)) {
      try {
        await deleteMutation.mutateAsync(category.id);
        toast.success('🗑️ Tag deleted successfully');
      } catch (error: any) {
        toast.error(error.message || 'Sorry, we couldn\'t delete this tag. Please try again.');
      }
    }
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: '', color: '#6366f1' });
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-10 bg-gray-100 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary-50 rounded-lg">
              <TagIcon className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Organize Tags</h2>
              <p className="text-sm text-gray-500">Create and manage tags to organize your notes</p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="btn btn-primary btn-sm flex items-center gap-2 whitespace-nowrap"
          >
            <PlusIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Add Tag</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-8">
            <TagIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <h3 className="text-gray-500 font-medium mb-1">No tags yet</h3>
            <p className="text-gray-400 text-sm mb-4">Create your first tag to organize your notes beautifully</p>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="btn btn-primary btn-sm"
            >
              Create Tag
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {categories.map((category) => (
              <div
                key={category.id}
                className="group flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-sm transition-all duration-200"
              >
                <CategoryBadge category={category} />
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => handleEdit(category)}
                    className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors duration-200"
                    title="Edit tag"
                  >
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(category)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                    title="Delete tag"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create/Edit Modal */}
      <Modal
        isOpen={isCreateModalOpen || !!editingCategory}
        onClose={handleCloseModal}
        title={editingCategory ? 'Edit Tag' : 'Create New Tag'}
        maxWidth="md"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Tag Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="input w-full"
              placeholder="Enter a descriptive name for your tag"
              required
            />
          </div>

          <div>
            <label htmlFor="color" className="block text-sm font-medium text-gray-700 mb-2">
              Tag Color
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, color }))}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                    formData.color === color 
                      ? 'border-gray-800 scale-110' 
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                id="color"
                value={formData.color}
                onChange={(e) => setFormData(prev => ({ ...prev, color: e.target.value }))}
                className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
              />
              <span className="text-sm text-gray-500">Pick any color you like</span>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
            <button
              type="button"
              onClick={handleCloseModal}
              className="btn btn-secondary btn-md w-full sm:w-auto"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={createMutation.isLoading || updateMutation.isLoading}
              className="btn btn-primary btn-md w-full sm:w-auto"
            >
              {createMutation.isLoading || updateMutation.isLoading 
                ? 'Saving...' 
                : editingCategory 
                  ? 'Update Tag' 
                  : 'Create Tag'
              }
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CategoryManager;