import { useQuery, useMutation, useQueryClient } from 'react-query';
import { noteService } from '../services/noteService';
import { CreateNoteRequest, UpdateNoteRequest, NoteFilters } from '../types/note.types';
import toast from 'react-hot-toast';

export const useNotes = (filters: NoteFilters = {}) => {
  return useQuery(
    ['notes', filters],
    () => noteService.getNotes(filters),
    {
      keepPreviousData: true,
      staleTime: 30000, // 30 seconds
    }
  );
};

export const useNote = (id: string) => {
  return useQuery(
    ['note', id],
    () => noteService.getNote(id),
    {
      enabled: !!id,
    }
  );
};

export const useCreateNote = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (data: CreateNoteRequest) => noteService.createNote(data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['notes']);
        toast.success('Note created successfully! ✨');
      },
    }
  );
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, data }: { id: string; data: UpdateNoteRequest }) =>
      noteService.updateNote(id, data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['notes']);
        queryClient.invalidateQueries(['note']);
        toast.success('Note updated successfully! 📝');
      },
    }
  );
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (id: string) => noteService.deleteNote(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['notes']);
        toast.success('Note deleted successfully! 🗑️');
      },
    }
  );
};

export const useArchiveNote = () => {
  const queryClient = useQueryClient();

  return useMutation(
    ({ id, isArchived }: { id: string; isArchived: boolean }) =>
      noteService.archiveNote(id, isArchived),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(['notes']);
        queryClient.invalidateQueries(['note']);
        const action = variables.isArchived ? 'archived' : 'unarchived';
        toast.success(`Note ${action} successfully! 📦`);
      },
    }
  );
};