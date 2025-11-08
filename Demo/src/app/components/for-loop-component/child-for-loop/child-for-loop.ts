import { Component, input } from '@angular/core';

@Component({
  selector: 'app-child-for-loop',
  imports: [],
  templateUrl: './child-for-loop.html',
  styleUrl: './child-for-loop.scss'
})
export class ChildForLoop {

  inputValue = input<string>('')

}
