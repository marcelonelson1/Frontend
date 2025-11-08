import { Component, OnInit, inject } from '@angular/core';
import { Artworks as ArtworksService, Artwork } from '../../services/artworks';
import { Card } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-artworks',
  imports: [Card, TableModule, Button],
  templateUrl: './artworks.html',
  styleUrl: './artworks.css',
  standalone: true
})
export class Artworks implements OnInit {
  artworksService = inject(ArtworksService);

  ngOnInit(): void {
    console.log('Artworks component initialized');
    this.loadArtworks();
  }

  loadArtworks(): void {
    this.artworksService.getArtworks().subscribe({
      next: (response) => {
        console.log('Artworks loaded successfully', response);
        this.artworksService.setArtworks(response.data);
      },
      error: (error) => {
        console.error('Error loading artworks', error);
        this.artworksService.loading.set(false);
      }
    });
  }

  reloadArtworks(): void {
    this.loadArtworks();
  }
}
