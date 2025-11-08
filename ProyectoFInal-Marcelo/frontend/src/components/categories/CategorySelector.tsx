import React, { useState } from 'react';
import { ChevronDownIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useCategories } from '../../hooks/useCategories';
import { Category } from '../../types/note.types';
import CategoryBadge from './CategoryBadge';
import Loading from '../common/Loading';

interface CategorySelectorProps {
  selectedCategories: Category[];
  onCategoriesChange: (categories: Category[]) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  selectedCategories,
  onCategoriesChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: categories = [], isLoading } = useCategories();

  const availableCategories = categories.filter(
    (category) => !selectedCategories.find((selected) => selected.id === category.id)
  );

  const handleCategorySelect = (category: Category) => {
    onCategoriesChange([...selectedCategories, category]);
    setIsOpen(false);
  };

  const handleCategoryRemove = (categoryId: string) => {
    onCategoriesChange(selectedCategories.filter((cat) => cat.id !== categoryId));
  };

  return (
    <div className="space-y-3">
      {/* Selected Categories */}
      {selectedCategories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map((category) => (
            <CategoryBadge
              key={category.id}
              category={category}
              onRemove={() => handleCategoryRemove(category.id)}
            />
          ))}
        </div>
      )}

      {/* Category Dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-3 py-2 text-left border border-gray-300 rounded-lg hover:border-gray-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-colors duration-200"
        >
          <span className="flex items-center space-x-2 text-gray-700">
            <PlusIcon className="w-4 h-4" />
            <span>Add category</span>
          </span>
          <ChevronDownIcon
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
            <div className="max-h-48 overflow-y-auto scrollbar-thin">
              {isLoading ? (
                <div className="px-3 py-4">
                  <Loading size="sm" text="Loading categories..." />
                </div>
              ) : availableCategories.length === 0 ? (
                <div className="px-3 py-4 text-sm text-gray-500 text-center">
                  {categories.length === 0 ? 'No categories available' : 'All categories selected'}
                </div>
              ) : (
                availableCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors duration-200 first:rounded-t-lg last:rounded-b-lg"
                  >
                    <CategoryBadge category={category} />
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySelector;