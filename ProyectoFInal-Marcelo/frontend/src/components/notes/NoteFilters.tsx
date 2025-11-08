import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCategories } from '../../hooks/useCategories';
import { NoteFilters } from '../../types/note.types';
import CategoryBadge from '../categories/CategoryBadge';

interface NoteFiltersProps {
  filters: NoteFilters;
  onFiltersChange: (filters: NoteFilters) => void;
}

const NotesFilters: React.FC<NoteFiltersProps> = ({ filters, onFiltersChange }) => {
  const [searchTerm, setSearchTerm] = useState(filters.search || '');
  const [showCategoryFilter, setShowCategoryFilter] = useState(false);
  const { data: categories = [] } = useCategories();

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, search: searchTerm || undefined });
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const selectedCategory = categories.find(cat => cat.id === filters.category_id);

  const handleCategorySelect = (categoryId?: string) => {
    onFiltersChange({
      ...filters,
      category_id: categoryId,
    });
    setShowCategoryFilter(false);
  };

  const hasActiveFilters = filters.search || filters.category_id;

  const clearAllFilters = () => {
    setSearchTerm('');
    onFiltersChange({
      is_archived: filters.is_archived,
    });
  };

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4 mb-4 sm:mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        {/* Search */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search your notes..."
            className="block w-full pl-9 sm:pl-10 pr-3 sm:pr-4 py-2 text-sm border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 transition-colors duration-200"
          />
        </div>

        {/* Category Filter & Clear */}
        <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3">
          <div className="relative flex-1 sm:flex-none">
            <button
              onClick={() => setShowCategoryFilter(!showCategoryFilter)}
              className={`flex items-center justify-between w-full sm:w-auto gap-2 px-3 sm:px-4 py-2 border rounded-md sm:rounded-lg text-sm transition-colors duration-200 ${
                selectedCategory
                  ? 'border-primary-300 bg-primary-50 text-primary-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center gap-2">
                <FunnelIcon className="w-4 h-4 flex-shrink-0" />
                <span className="font-medium truncate">
                  {selectedCategory ? selectedCategory.name : 'All Tags'}
                </span>
              </div>
            </button>

            {showCategoryFilter && (
              <div className="absolute left-0 sm:right-0 mt-2 w-full sm:w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
                <div className="p-2 max-h-60 overflow-y-auto">
                  <button
                    onClick={() => handleCategorySelect()}
                    className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-md transition-colors duration-200"
                  >
                    ✨ Show all notes
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                      <CategoryBadge category={category} size="sm" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-md sm:rounded-lg transition-colors duration-200 whitespace-nowrap"
            >
              <XMarkIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center gap-2">
          <span className="text-sm text-gray-600 flex-shrink-0">🔍 Filtering by:</span>
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {filters.search && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 sm:py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                <MagnifyingGlassIcon className="w-3 h-3" />
                <span className="truncate max-w-[120px] sm:max-w-none">
                  {filters.search}
                </span>
              </span>
            )}
            {selectedCategory && (
              <CategoryBadge category={selectedCategory} size="xs" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotesFilters;