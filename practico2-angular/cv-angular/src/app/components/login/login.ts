import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../../services/auth';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [Card, Button],
  templateUrl: './login.html',
  styleUrl: './login.css',
  standalone: true
})
export class Login {
  authService = inject(Auth);
  router = inject(Router);

  // Signal para mostrar mensaje de éxito
  loginSuccess = signal<boolean>(false);

  // Login simulado con botón (sin formulario)
  simulateLogin(): void {
    const username = 'Emanuel Boz';
    this.authService.login(username);
    this.loginSuccess.set(true);

    // Redirigir al curriculum después de 1 segundo
    setTimeout(() => {
      this.router.navigate(['/curriculum']);
    }, 1000);
  }
}
