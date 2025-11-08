import { Component } from '@angular/core';
import { ChildForLoop } from './child-for-loop/child-for-loop';

@Component({
  selector: 'app-for-loop-component',
  imports: [ChildForLoop],
  templateUrl: './for-loop-component.html',
  styleUrl: './for-loop-component.scss'
})
export class ForLoopComponent {

  items = ['A','B','C', 'D']
}
