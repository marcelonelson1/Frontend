export const JsItems = [
  {
    title: 'Variables',
    description: `<strong>- Variable que puede cambiar de valor:</strong> <br> <em> let name = value</em>  <br><br> <strong>- Variable que no puede cambiar de valor: </strong><br> <em>const name = value</em>`,
  },
  {
    title: 'Declare object',
    description: `const objectName = { <br>&nbsp;&nbsp;PropertyName: "Property Value", <br> &nbsp;&nbsp;secondName: 50 <br>};`,
  },
  {
    title: 'Add property type',
    description: `const name: string = 'This is a string'`,
  },
  {
    title: 'Function Declaration',
    description: `function sayHello() {
      &nbsp&nbspconsole.log('Hello!');
    }`,
  },
  {
    title: 'Function Expression',
    description: `const sayHello = function() {
      &nbsp&nbspconsole.log('Hello!');
    };`,
  },
  {
    title: 'Arrow Function',
    description: `const sayHello = () => {
      &nbsp&nbspconsole.log('Hello!');
    };`,
  },
  {
    title: 'Data Types',
    description: `<strong>String:</strong> const text: string = 'Hola mundo'
        <strong>Number:</strong> const age: number = 30
        <strong>Boolean:</strong> const isActive: boolean = true
        <strong>null:</strong> const empty: null = null`
  },
  {
    title: 'Arrays',
    description: `const numbers: number[] = [1, 2, 3, 4]
        numbers.push(5) <em>// [1, 2, 3, 4, 5]</em>
        numbers.map(n => n * 2) <em>// [2, 4, 6, 8, 10]</em><br>
        const numbers: number[] = [1, 2, 3, 4, 5];
        const evens = numbers.filter(n => n % 2 === 0);
        <em>// Resultado: [2, 4]</cruem>`
  }
];

export const AngularItems = [
  {
    title: 'Basic comands',
    description: `<strong>Correr proyecto:</strong>
    ng serve <br>
    <strong>Crear componente:</strong>
    ng generate c component-name <br>
    <strong>Crear servicio:</strong>
    ng generate s service-name
     <strong>Crear guard:</strong>
    ng generate g service-name`
  },
  {
    title: 'Component: Properties & Methods',
    description: `<code>
export class UserCardComponent {
  // simple public properties
  name: string = 'Ada';
  age: number = 28;

  // method
  incrementAge(): void {
    this.age++;
  }
}
</code>
    `
  },
  {
    title: '@Component Anatomy',
    description: `<code>
@Component({
  // Name used in html to embed this component
  selector: 'app-demo',
  standalone: true, 
  // modules/components used in template
  imports: [CommonModule],
  templateUrl: './child-component.html',
  styleUrl: './child-component.scss'
})
export class DemoComponent {}
</code>`
  },
  {
    title: 'Signals: create & read',
    description: `<code>
export class CounterComponent {
  count = signal(0);

  inc() {
    // update with producer fn
    this.count.update(v => v + 1);
    // or set directly
    this.count.set(123);        
  }
}
</code>
      <em>// Reading a signal uses function-call syntax:<code>
      mySignal()
      </code></em>
    `
  },
  {
    title: 'Signals: computed & effect',
    description: `<code>
export class PriceComponent {
  qty = signal(2);
  unit = signal(10);
  
  <em>// <code>computed</code> derives values; 
  // Then is used as a normal signal</em>
  total = computed(() => this.qty() * this.unit());

  <em>//<code>effect</code> runs side-effects on changes.
  // Can't update signals</em>
  log = effect(() => {
    console.log('Total changed:', this.total());
  });
}
</code>
    `
  },
  {
    title: 'Inject()',
    description: `<code>
export class CtxComponent {
  // inject within class body (no constructor needed)
  svc = inject(SomeService);
}
</code>
    `
  },
  {
    title: 'Services: create & use',
    description: `<code>
// tree-shakable singleton
// every use will be the same instance 
// as it is provided in root
@Injectable({ providedIn: 'root' }) 
export class SomeService {
  getMessage() { return 'Hello from service'; }
}
</code>
<code>

@Component({
  selector: 'app-consumer',
  standalone: true,
  template: \`&lt;p&gt;{{ msg }}&lt;/p&gt;\`
})
export class ConsumerComponent {
  private svc = inject(SomeService);
  msg = this.svc.getMessage();
}
</code>
    `
  },
  {
  title: 'Interface',
  description: `<code>
  // interface = shape of an object
export interface User {
  id: number;
  name: string;
  email?: string; // optional property
}
//To use it:
const user: User = {
  id: 1,
  name: 'Alice'
};
</code></pre>
    <em>// Interfaces describe data contracts, no implementation.</em>
  `
},
{
  title: 'Model (Class)',
  description: `<code>
  // class = blueprint + logic
export class UserModel {
  constructor(
    public id: number,
    public name: string,
    public email?: string
  ) {}

  greet(): string {
    return \`Hello, \${this.name}!\`;
  }
}

// To use it:
const user = 
new UserModel(2, 'Bob', 'bob@mail.com');
console.log(user.greet()); 
</code></pre>
    <em>// Classes can hold both data and behavior (methods).</em>
  `
}
];
