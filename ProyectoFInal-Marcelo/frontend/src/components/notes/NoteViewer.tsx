import React from 'react';
import { Note } from '../../types/note.types';
import { CalendarIcon, TagIcon, ArchiveBoxIcon } from '@heroicons/react/24/outline';
import CategoryBadge from '../categories/CategoryBadge';

interface NoteViewerProps {
  note: Note;
}

const NoteViewer: React.FC<NoteViewerProps> = ({ note }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < content.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight break-words">
          {note.title}
        </h1>

        {/* Status and metadata */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 flex-shrink-0" />
            <span>Created on {formatDate(note.created_at)}</span>
          </div>
          
          {note.updated_at !== note.created_at && (
            <div className="flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 flex-shrink-0" />
              <span>Last edited on {formatDate(note.updated_at)}</span>
            </div>
          )}

          {note.is_archived && (
            <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
              <ArchiveBoxIcon className="w-4 h-4" />
              <span className="font-medium">Archived</span>
            </div>
          )}
        </div>

        {/* Categories */}
        {note.categories && note.categories.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <TagIcon className="w-4 h-4" />
              <span>Tagged as</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {note.categories.map((category) => (
                <CategoryBadge key={category.id} category={category} size="sm" />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200"></div>

      {/* Content */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Your Note</h2>
        {note.content ? (
          <div className="prose max-w-none">
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words text-sm sm:text-base bg-gray-50 p-4 rounded-lg border-l-4 border-primary-400">
              {formatContent(note.content)}
            </div>
          </div>
        ) : (
          <div className="text-gray-500 italic text-center py-8 border-2 border-dashed border-gray-200 rounded-lg bg-gray-50">
            <div className="space-y-2">
              <p>This note is waiting for your thoughts ✨</p>
              <p className="text-xs">Click edit to add some content</p>
            </div>
          </div>
        )}
      </div>

      {/* Statistics */}
      <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-lg p-4 space-y-3 border border-primary-100">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
          📊 Quick Stats
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <div className="font-bold text-lg text-primary-600">
              {note.title.split(' ').length}
            </div>
            <div className="text-gray-600">Title words</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-green-600">
              {note.content ? note.content.split(' ').length : 0}
            </div>
            <div className="text-gray-600">Content words</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-blue-600">
              {note.content ? note.content.length : 0}
            </div>
            <div className="text-gray-600">Characters</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-lg text-purple-600">
              {note.categories?.length || 0}
            </div>
            <div className="text-gray-600">Tags</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteViewer;