import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

// A service is injectable by nature
// because of the @Injectable decorator
// provided in root means that this service
// is a singleton and can be injected anywhere
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  router = inject(Router);

  // Using Angular Signals to manage login state
  private loggedIn = signal(false);

  // Computed property to expose login state
  public isLoggedIn = computed(() => this.loggedIn());

  login() {
    this.loggedIn.set(true);
  }

  logout() {
    this.router.navigateByUrl('');
    this.loggedIn.set(false);
  }
}
