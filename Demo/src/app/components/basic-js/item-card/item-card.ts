import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'app-item-card',
  imports: [CommonModule],
  templateUrl: './item-card.html',
  styleUrl: './item-card.scss'
})
export class ItemCard {

  bigger = input(false);
  title = input('Title');
  description = input('Description');

}
