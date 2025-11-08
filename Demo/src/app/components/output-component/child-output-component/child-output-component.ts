import { Component, output } from '@angular/core';

@Component({
  selector: 'app-child-output-component',
  imports: [],
  templateUrl: './child-output-component.html',
  styleUrl: './child-output-component.scss'
})
export class ChildOutputComponent {

  outputEvent = output<string>()


  throwOutputEvent() {
    this.outputEvent.emit('Value emmitted from the child component ');
  }
}
