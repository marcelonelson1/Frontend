import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  // Signal para mantener estado de autenticación
  isAuthenticated = signal<boolean>(false);
  currentUser = signal<string | null>(null);

  login(username: string): void {
    this.isAuthenticated.set(true);
    this.currentUser.set(username);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('currentUser', username);
  }

  logout(): void {
    this.isAuthenticated.set(false);
    this.currentUser.set(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('currentUser');
  }

  checkAuthentication(): void {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    const user = localStorage.getItem('currentUser');
    this.isAuthenticated.set(isAuth);
    this.currentUser.set(user);
  }
}
