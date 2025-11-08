import { Component, Input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [DatePipe],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  standalone: true
})
export class Footer {
  @Input() author: string = 'Emanuel Boz';
  currentYear = new Date();
}
