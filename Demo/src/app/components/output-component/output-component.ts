import { Component } from '@angular/core';
import { ChildOutputComponent } from "./child-output-component/child-output-component";

@Component({
  selector: 'app-output-component',
  imports: [ChildOutputComponent],
  templateUrl: './output-component.html',
  styleUrl: './output-component.scss'
})
export class OutputComponent {

  /*
  Para pasar información de un componente hijo a un componente padre en Angular, 
  se utiliza la señal output() en el componente hijo. 
  Aquí tienes un ejemplo básico de cómo hacerlo:
   - En el componente hijo (ChildComponent), define una señal output() para emitir datos al padre.
   - En el componente padre (ParentComponent), utiliza la propiedad del componente hijo para escuchar los eventos emitidos en el html.
   - Define un método en el padre para manejar los datos recibidos del hijo.
   - En el hijo, emite eventos utilizando la señal output().emit() cuando sea necesario.
  */

  value = 'Click the button to throw an output event. ';
  counter = 0;

  recieveOutput(event: string) {
    this.value = event;
    this.counter++;
  }

}
