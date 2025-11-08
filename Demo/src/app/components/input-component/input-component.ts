import { Component } from '@angular/core';
import { ChildInputComponent } from './child-input-component/child-input-component';

@Component({
  selector: 'app-input-component',
  imports: [ChildInputComponent],
  templateUrl: './input-component.html',
  styleUrl: './input-component.scss'
})
export class InputComponent {

  /*
  Para pasar información de un componente padre a un componente hijo en Angular, 
  se utiliza la señal input() en el componente hijo. 
  Aquí tienes un ejemplo básico de cómo hacerlo:
   - En el componente hijo (ChildComponent), define una señal input() para recibir datos del padre.
   - En el componente padre (ParentComponent), utiliza la propiedad del componente hijo para pasarle datos en el html.
   - Utiliza la variable input en el hijo como necesites hacerlo.
  */

}
