export interface Artwork {
id: number;
title: string | null;
description: string | null;
place_of_origin: string | null;
}

export interface ArtworksResponse {
data: Artwork[];
pagination: {
        total_pages: number,
        current_page: number   
    },
}  