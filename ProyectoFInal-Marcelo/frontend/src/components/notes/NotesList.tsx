import React from 'react';
import { Note } from '../../types/note.types';
import NoteCard from './NoteCard';
import Loading from '../common/Loading';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

interface NotesListProps {
  notes: Note[];
  isLoading: boolean;
  isArchived: boolean;
  onEditNote: (note: Note) => void;
  onDeleteNote: (note: Note) => void;
  onArchiveNote: (note: Note, isArchived: boolean) => void;
  onViewNote: (note: Note) => void;
}

const NotesList: React.FC<NotesListProps> = ({
  notes,
  isLoading,
  isArchived,
  onEditNote,
  onDeleteNote,
  onArchiveNote,
  onViewNote,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loading size="lg" text="Loading notes..." />
      </div>
    );
  }

  if (notes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <DocumentTextIcon className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          {isArchived ? 'No archived notes yet' : 'Your canvas is blank'}
        </h3>
        <p className="text-gray-500 max-w-sm mx-auto">
          {isArchived
            ? 'When you archive notes, they\'ll appear here for safe keeping 📦'
            : 'Ready to capture your first brilliant idea? Click "Add Note" to get started! ✨'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-3 xs:gap-4 sm:gap-6 grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {notes.map((note) => (
        <div key={note.id} className="animate-in">
          <NoteCard
            note={note}
            onEdit={onEditNote}
            onDelete={onDeleteNote}
            onArchive={onArchiveNote}
            onView={onViewNote}
          />
        </div>
      ))}
    </div>
  );
};

export default NotesList;