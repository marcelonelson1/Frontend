import { Component } from '@angular/core';

@Component({
  selector: 'app-type-script-component',
  imports: [],
  templateUrl: './type-script-component.html',
  styleUrl: './type-script-component.scss'
})
export class TypeScriptComponent {

  title = 'This is a title from the typescript'
  imageSrc = 'imagen.jpg'

  changeTitle() {
    this.title = 'Title changed from the typescript'
  }
}
