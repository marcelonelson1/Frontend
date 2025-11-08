import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './services/login-service';

// Guard to protect routes that require authentication
// If the user is not logged in, they will be redirected to the login page
// If they are logged in, they will be allowed to access the route
export const authGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  if (!loginService.isLoggedIn()) {
    alert("You must be logged in to access this page.");
    router.navigate(['/login']);
    return false;
  }
  return true;
};
