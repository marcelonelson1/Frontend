import React from 'react';
import { Category } from '../../types/note.types';

interface CategoryBadgeProps {
  category: Category;
  size?: 'xs' | 'sm' | 'md';
  onRemove?: () => void;
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({ category, size = 'sm', onRemove }) => {
  const sizeClasses = {
    xs: 'px-1.5 py-0.5 text-xs',
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1.5 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full font-medium ${sizeClasses[size]} transition-colors duration-200`}
      style={{
        backgroundColor: `${category.color}20`,
        color: category.color,
        borderColor: `${category.color}40`,
        border: '1px solid',
      }}
    >
      <span>{category.name}</span>
      {onRemove && (
        <button
          onClick={onRemove}
          className="ml-1.5 inline-flex h-4 w-4 items-center justify-center rounded-full hover:bg-black hover:bg-opacity-10 transition-colors duration-200"
        >
          <span className="text-xs">×</span>
        </button>
      )}
    </span>
  );
};

export default CategoryBadge;