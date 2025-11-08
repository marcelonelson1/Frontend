import { Component } from '@angular/core';
import { IfConditionalChild } from './if-conditional-child/if-conditional-child';

@Component({
  selector: 'app-if-conditional-component',
  imports: [IfConditionalChild],
  templateUrl: './if-conditional-component.html',
  styleUrl: './if-conditional-component.scss'
})
export class IfConditionalComponent {
  
  mostrar = false
}
