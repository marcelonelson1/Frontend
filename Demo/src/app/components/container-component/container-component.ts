import { Component } from '@angular/core';
import { ChildComponent } from './child-component/child-component';

@Component({
  selector: 'app-container-component',
  imports: [ChildComponent],
  templateUrl: './container-component.html',
  styleUrl: './container-component.scss'
})
export class ContainerComponent {

}
