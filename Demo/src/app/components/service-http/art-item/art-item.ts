import { Component, input } from '@angular/core';
import { Artwork } from '../../../models/artwork.model';

@Component({
  selector: 'app-art-item',
  imports: [],
  templateUrl: './art-item.html',
  styleUrl: './art-item.scss'
})
export class ArtItem {

  inputValue = input<Artwork>();


  getDescription(): string {
    return this.inputValue()?.description || 'No description available.' + ' Origin: ' + (this.inputValue()?.place_of_origin || 'Unknown');
  }

}
