import React, { useState } from 'react';
import { Note, NoteFilters } from '../types/note.types';
import { useNotes, useCreateNote, useUpdateNote, useDeleteNote, useArchiveNote } from '../hooks/useNotes';
import Header from '../components/common/Header';
import NotesList from '../components/notes/NotesList';
import NotesFilters from '../components/notes/NoteFilters';
import Modal from '../components/common/Modal';
import NoteForm from '../components/notes/NoteForm';
import CategoryManager from '../components/categories/CategoryManager';
import NoteViewer from '../components/notes/NoteViewer';
import toast from 'react-hot-toast';

type TabType = 'active' | 'archived';

const NotesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('active');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [viewingNote, setViewingNote] = useState<Note | null>(null);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);
  const [filters, setFilters] = useState<NoteFilters>({
    is_archived: false,
    limit: 50,
    offset: 0,
  });

  // Update filters when tab changes
  React.useEffect(() => {
    setFilters(prev => ({
      ...prev,
      is_archived: activeTab === 'archived',
      offset: 0,
    }));
  }, [activeTab]);

  // Queries and mutations
  const { data: notesResponse, isLoading } = useNotes(filters);
  const createNoteMutation = useCreateNote();
  const updateNoteMutation = useUpdateNote();
  const deleteNoteMutation = useDeleteNote();
  const archiveNoteMutation = useArchiveNote();

  const notes = notesResponse?.data || [];

  // Handlers
  const handleCreateNote = async (data: any) => {
    try {
      await createNoteMutation.mutateAsync(data);
      setIsCreateModalOpen(false);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleUpdateNote = async (data: any) => {
    if (!editingNote) return;
    
    try {
      await updateNoteMutation.mutateAsync({
        id: editingNote.id,
        data,
      });
      setEditingNote(null);
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleDeleteNote = async (note: Note) => {
    if (window.confirm(`Are you sure you want to delete "${note.title}"?\n\nThis action cannot be undone, but we believe you can always create something even better! ✨`)) {
      try {
        await deleteNoteMutation.mutateAsync(note.id);
      } catch (error) {
        // Error is handled by the mutation
      }
    }
  };

  const handleArchiveNote = async (note: Note, isArchived: boolean) => {
    try {
      await archiveNoteMutation.mutateAsync({
        id: note.id,
        isArchived,
      });
    } catch (error) {
      // Error is handled by the mutation
    }
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
  };

  const handleFiltersChange = (newFilters: NoteFilters) => {
    setFilters(prev => ({
      ...newFilters,
      is_archived: prev.is_archived, // Keep the current tab state
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onNewNote={() => setIsCreateModalOpen(true)}
        onManageCategories={() => setIsCategoryManagerOpen(true)}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Filters */}
        <NotesFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />

        {/* Notes Grid */}
        <NotesList
          notes={notes}
          isLoading={isLoading}
          isArchived={activeTab === 'archived'}
          onEditNote={setEditingNote}
          onDeleteNote={handleDeleteNote}
          onArchiveNote={handleArchiveNote}
          onViewNote={setViewingNote}
        />

        {/* Results info */}
        {!isLoading && notesResponse && (
          <div className="mt-8 text-center text-sm text-gray-500">
            📝 Showing {notes.length} of {notesResponse.meta.total} {notesResponse.meta.total === 1 ? 'note' : 'notes'}
          </div>
        )}
      </main>

      {/* Create Note Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="✍️ Create New Note"
        maxWidth="lg"
      >
        <NoteForm
          onSubmit={handleCreateNote}
          onCancel={() => setIsCreateModalOpen(false)}
          isLoading={createNoteMutation.isLoading}
        />
      </Modal>

      {/* Edit Note Modal */}
      <Modal
        isOpen={!!editingNote}
        onClose={() => setEditingNote(null)}
        title="✏️ Edit Note"
        maxWidth="lg"
      >
        {editingNote && (
          <NoteForm
            note={editingNote}
            onSubmit={handleUpdateNote}
            onCancel={() => setEditingNote(null)}
            isLoading={updateNoteMutation.isLoading}
          />
        )}
      </Modal>

      {/* Category Manager Modal */}
      <Modal
        isOpen={isCategoryManagerOpen}
        onClose={() => setIsCategoryManagerOpen(false)}
        title="🏷️ Organize Your Tags"
        maxWidth="2xl"
      >
        <CategoryManager />
      </Modal>

      {/* View Note Modal */}
      <Modal
        isOpen={!!viewingNote}
        onClose={() => setViewingNote(null)}
        title="👀 Note Details"
        maxWidth="2xl"
      >
        {viewingNote && <NoteViewer note={viewingNote} />}
      </Modal>
    </div>
  );
};

export default NotesPage;