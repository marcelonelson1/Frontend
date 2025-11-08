import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Artwork {
  id: number;
  title: string;
  artist_display: string;
  date_display: string;
  place_of_origin: string;
  medium_display: string;
}

export interface ArtworksResponse {
  data: Artwork[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    total_pages: number;
    current_page: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class Artworks {
  private apiUrl = 'https://api.artic.edu/api/v1/artworks';

  // Signal para mantener las obras de arte
  artworksList = signal<Artwork[]>([]);
  loading = signal<boolean>(false);

  constructor(private http: HttpClient) {}

  getArtworks(): Observable<ArtworksResponse> {
    this.loading.set(true);
    return this.http.get<ArtworksResponse>(`${this.apiUrl}?limit=20`);
  }

  setArtworks(artworks: Artwork[]): void {
    this.artworksList.set(artworks);
    this.loading.set(false);
  }
}
