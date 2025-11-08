import { Routes } from '@angular/router';
import { SimpleComponent } from './components/simple-component/simple-component';
import { BasicJs } from './components/basic-js/basic-js';
import { TypeScriptComponent } from './components/type-script-component/type-script-component';
import { ContainerComponent } from './components/container-component/container-component';
import { ForLoopComponent } from './components/for-loop-component/for-loop-component';
import { IfConditionalComponent } from './components/if-conditional-component/if-conditional-component';
import { InputComponent } from './components/input-component/input-component';
import { OutputComponent } from './components/output-component/output-component';
import { UsingService } from './components/using-service-component/using-service-component';
import { authGuard } from './misc/auth-guard';
import { ServiceHttpComponent } from './components/service-http/service-http-component';

/*
  Define the application routes
  Each route maps a URL path to a component
  You should have a route with ** path at the end to catch all undefined routes
  Check app html to understand how to use this routes
  Can Activate guard is also added to demonstrate route protection
  To use the guard, uncomment the import and the canActivate line below
  and implement the logic inside the auth-guard-guard.ts file
*/ 
export const routes: Routes = [
  { 
    path: '', 
    component: UsingService, 
    pathMatch: 'full' 
  },
  { 
    path: 'basic-js',
    component: BasicJs,
    canActivate: [authGuard]
  },
  { 
    path: 'simple-component',
    component: SimpleComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'using-typescript-in-html', 
    component: TypeScriptComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'component-inside-component', 
    component: ContainerComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'for-loop', 
    component: ForLoopComponent,
    canActivate: [authGuard]
  },
  {
    path: 'if-conditional', 
    component: IfConditionalComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'component-with-input', 
    component: InputComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'component-with-output', 
    component: OutputComponent,
    canActivate: [authGuard]
  },
  { 
    path: 'service-http', 
    component: ServiceHttpComponent,
    canActivate: [authGuard]
  },
  { 
    path: '**', redirectTo: ''
  },
];
