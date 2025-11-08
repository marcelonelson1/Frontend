import { Component, input } from '@angular/core';

@Component({
  selector: 'app-child-input-component',
  imports: [],
  templateUrl: './child-input-component.html',
  styleUrl: './child-input-component.scss'
})
export class ChildInputComponent {

  inputValue = input('Default value');

}
