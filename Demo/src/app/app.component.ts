import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { LoginService } from './services/login-service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  loginService = inject(LoginService);
  
  selector = 'Empty';
items = [
  { label: "Empty", route: "", authRequired: false },
  { label: "Basic JS", route: "/basic-js", authRequired: true },
  { label: "Simple Component", route: "/simple-component", authRequired: true },
  { label: "Using typescript in html", route: "/using-typescript-in-html", authRequired: true },
  { label: "Component inside component", route: "/component-inside-component", authRequired: true },
  { label: "Component with input", route: "/component-with-input", authRequired: true },
  { label: "Component with output", route: "/component-with-output", authRequired: true },
  { label: "For loop", route: "/for-loop", authRequired: true },
  { label: "If conditional", route: "/if-conditional", authRequired: true },
  { label: "Service HTTP", route: "/service-http", authRequired: true }
];
} 
