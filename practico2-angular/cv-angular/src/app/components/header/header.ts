import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../services/auth';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [RouterLink, Button],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true
})
export class Header implements OnInit {
  authService = inject(Auth);
  router = inject(Router);

  ngOnInit(): void {
    // Verificar autenticación al inicializar
    this.authService.checkAuthentication();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
