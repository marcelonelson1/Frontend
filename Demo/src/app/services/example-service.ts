import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { effect, inject, Injectable, signal } from '@angular/core';
import { Artwork, ArtworksResponse } from '../models/artwork.model';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

// Injecting HttpClient to make HTTP requests remember to use provideHttpClient() in app.config.ts
private http = inject(HttpClient);
// Base URL for the Art Institute of Chicago API
private readonly baseUrl = 'https://api.artic.edu/api/v1/artworks';


// Signals to manage state exposed to components
readonly page = signal(1);
readonly maxPages = signal(1); // assuming a max of 100 pages for demo
readonly artworks = signal<Artwork[]>([]);
readonly isLoading = signal(false);


constructor() {
// Load artworks whenever the page changes
// Effect is used to react to signal changes runs at least once when created
effect(() => {
this.loadArtworks(this.page());
});
}


loadArtworks(page: number) {
this.isLoading.set(true);
// Setting up query parameters for the API request
const params = new HttpParams()
.set('fields', 'id,title,description,place_of_origin')
.set('limit', '2')
.set('page', page);

// Making the HTTP GET request
this.http.get<ArtworksResponse>(this.baseUrl, { params }).subscribe((res) => {
this.artworks.set(res.data);
this.maxPages.set(res.pagination.total_pages);
this.isLoading.set(false);
});
}


nextPage() {
this.page.update((p) => p + 1);
}


prevPage() {
this.page.update((p) => Math.max(1, p - 1));
}

  
}