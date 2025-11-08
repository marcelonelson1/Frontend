import React from 'react';
import { Note } from '../../types/note.types';
import { PencilIcon, TrashIcon, ArchiveBoxIcon, ArchiveBoxXMarkIcon, EyeIcon } from '@heroicons/react/24/outline';
import CategoryBadge from '../categories/CategoryBadge';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (note: Note) => void;
  onArchive: (note: Note, isArchived: boolean) => void;
  onView: (note: Note) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onEdit, onDelete, onArchive, onView }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="card card-hover p-3 sm:p-4 md:p-6 group h-full flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-primary-700 transition-colors duration-200 pr-2">
          {note.title}
        </h3>
        
        {/* Actions - Always visible on touch devices */}
        <div className="flex items-center space-x-0.5 sm:space-x-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 flex-shrink-0">
          <button
            onClick={() => onView(note)}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md sm:rounded-lg transition-colors duration-200"
            title="View note details"
          >
            <EyeIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>

          <button
            onClick={() => onEdit(note)}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-md sm:rounded-lg transition-colors duration-200"
            title="Edit note"
          >
            <PencilIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
          
          <button
            onClick={() => onArchive(note, !note.is_archived)}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-md sm:rounded-lg transition-colors duration-200"
            title={note.is_archived ? 'Unarchive note' : 'Archive note'}
          >
            {note.is_archived ? (
              <ArchiveBoxXMarkIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            ) : (
              <ArchiveBoxIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            )}
          </button>
          
          <button
            onClick={() => onDelete(note)}
            className="p-1.5 sm:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md sm:rounded-lg transition-colors duration-200"
            title="Delete note"
          >
            <TrashIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Content */}
      {note.content && (
        <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3 leading-relaxed flex-grow">
          {truncateText(note.content, 120)}
        </p>
      )}

      {/* Categories */}
      {note.categories && note.categories.length > 0 && (
        <div className="flex flex-wrap gap-1 sm:gap-2 mb-3 sm:mb-4">
          {note.categories.slice(0, 3).map((category) => (
            <CategoryBadge key={category.id} category={category} size="xs" />
          ))}
          {note.categories.length > 3 && (
            <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">
              +{note.categories.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 sm:pt-4 border-t border-gray-100 mt-auto">
        <div className="text-xs text-gray-500 truncate pr-2">
          <span className="hidden sm:inline">Updated </span>
          <span className="sm:hidden">Upd </span>
          <span className="hidden xs:inline">{formatDate(note.updated_at)}</span>
          <span className="xs:hidden">
            {new Date(note.updated_at).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric' 
            })}
          </span>
        </div>
        
        {note.is_archived && (
          <div className="flex items-center text-xs text-amber-600 bg-amber-50 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex-shrink-0">
            <ArchiveBoxIcon className="w-3 h-3 mr-0.5 sm:mr-1" />
            <span className="hidden sm:inline">Archived</span>
            <span className="sm:hidden">Arc</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteCard;