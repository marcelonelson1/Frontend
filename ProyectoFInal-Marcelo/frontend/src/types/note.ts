export interface Note {
  id: string;
  title: string;
  content: string;
  is_archived: boolean;
  categories: Category[];
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface CreateNoteRequest {
  title: string;
  content: string;
  categories?: string[];
}

export interface UpdateNoteRequest {
  title?: string;
  content?: string;
  categories?: string[];
}

export interface NoteFilters {
  is_archived?: boolean;
  category_id?: string;
  search?: string;
  limit?: number;
  offset?: number;
}