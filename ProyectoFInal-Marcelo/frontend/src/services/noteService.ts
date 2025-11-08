import api from './api';
import { Note, CreateNoteRequest, UpdateNoteRequest, NoteFilters } from '../types/note.types';
import { ApiResponse, PaginatedResponse } from '../types/api.types';

export const noteService = {
  // Create a new note
  createNote: async (data: CreateNoteRequest): Promise<Note> => {
    const response = await api.post<ApiResponse<Note>>('/notes', data);
    return response.data.data!;
  },

  // Get all notes with filters
  getNotes: async (filters: NoteFilters = {}): Promise<PaginatedResponse<Note>> => {
    const params = new URLSearchParams();
    
    if (filters.is_archived !== undefined) {
      params.append('is_archived', filters.is_archived.toString());
    }
    if (filters.category_id) {
      params.append('category_id', filters.category_id);
    }
    if (filters.search) {
      params.append('search', filters.search);
    }
    if (filters.limit) {
      params.append('limit', filters.limit.toString());
    }
    if (filters.offset) {
      params.append('offset', filters.offset.toString());
    }

    const response = await api.get<PaginatedResponse<Note>>(`/notes?${params.toString()}`);
    return response.data;
  },

  // Get a specific note by ID
  getNote: async (id: string): Promise<Note> => {
    const response = await api.get<ApiResponse<Note>>(`/notes/${id}`);
    return response.data.data!;
  },

  // Update a note
  updateNote: async (id: string, data: UpdateNoteRequest): Promise<Note> => {
    const response = await api.put<ApiResponse<Note>>(`/notes/${id}`, data);
    return response.data.data!;
  },

  // Delete a note
  deleteNote: async (id: string): Promise<void> => {
    await api.delete(`/notes/${id}`);
  },

  // Archive/unarchive a note
  archiveNote: async (id: string, isArchived: boolean): Promise<Note> => {
    const response = await api.patch<ApiResponse<Note>>(`/notes/${id}/archive`, {
      is_archived: isArchived,
    });
    return response.data.data!;
  },
};