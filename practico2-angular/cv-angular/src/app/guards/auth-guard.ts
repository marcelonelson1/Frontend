import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(Auth);
  const router = inject(Router);

  // Verificar autenticación
  authService.checkAuthentication();

  if (authService.isAuthenticated()) {
    return true;
  } else {
    // Redirigir al login si no está autenticado
    router.navigate(['/login']);
    return false;
  }
};
