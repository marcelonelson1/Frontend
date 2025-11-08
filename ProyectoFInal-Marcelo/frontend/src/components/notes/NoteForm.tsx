import React, { useState, useEffect } from 'react';
import { Note, CreateNoteRequest, UpdateNoteRequest } from '../../types/note.types';
import CategorySelector from '../categories/CategorySelector';
import Loading from '../common/Loading';

interface NoteFormProps {
  note?: Note;
  isLoading?: boolean;
  onSubmit: (data: CreateNoteRequest | UpdateNoteRequest) => void;
  onCancel: () => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ note, isLoading = false, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [selectedCategories, setSelectedCategories] = useState(note?.categories || []);

  const isEditing = !!note;

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setSelectedCategories(note.categories || []);
    }
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    const data = {
      title: title.trim(),
      content: content.trim(),
      categories: selectedCategories.map(cat => cat.id),
    };

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter note title..."
          className="input"
          required
          disabled={isLoading}
        />
      </div>

      {/* Content */}
      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your note content here..."
          rows={8}
          className="textarea"
          disabled={isLoading}
        />
      </div>

      {/* Categories */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categories
        </label>
        <CategorySelector
          selectedCategories={selectedCategories}
          onCategoriesChange={setSelectedCategories}
        />
      </div>

      {/* Actions */}
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-4 border-t border-gray-200">
        <button
          type="button"
          onClick={onCancel}
          className="btn btn-secondary btn-md w-full sm:w-auto"
          disabled={isLoading}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-primary btn-md w-full sm:w-auto sm:min-w-[120px]"
          disabled={isLoading || !title.trim()}
        >
          {isLoading ? (
            <Loading size="sm" />
          ) : (
            <span>{isEditing ? 'Update Note' : 'Create Note'}</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default NoteForm;