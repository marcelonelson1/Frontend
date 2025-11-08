import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginService } from '../../services/login-service';
import { Button } from 'primeng/button';

interface NavItem {
  label: string;
  route: string;
  active?: boolean;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, Button],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  navItems: NavItem[] = [
    { label: 'Inicio', route: '/home', active: true },
    { label: 'Sobre Mí', route: '/about', active: false },
    { label: 'Proyectos', route: '/projects', active: false },
    { label: 'Contacto', route: '/contact', active: false }
  ];

  protected isMobileMenuOpen = signal(false);

  constructor(public loginService: LoginService) {}

  ngOnInit(): void {
    // Verificar el estado de autenticación al inicializar el componente
    console.log('[Header] Componente inicializado');
    console.log('[Header] Usuario autenticado:', this.loginService.isLoggedIn());
  }

  setActiveNavItem(selectedRoute: string) {
    this.navItems.forEach(item => {
      item.active = item.route === selectedRoute;
    });
    this.closeMobileMenu();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen.update((value: boolean) => !value);
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }

  login() {
    // Para pruebas, usar credenciales de test
    const testCredentials = {
      email: 'test@example.com',
      password: 'testpass123'
    };
    
    this.loginService.login(testCredentials).subscribe({
      next: (success) => {
        if (success) {
          console.log('Login exitoso');
        } else {
          console.log('Login fallido');
        }
      },
      error: (error) => {
        console.error('Error en login:', error);
      }
    });
  }

  logout() {
    this.loginService.logout();
  }
}