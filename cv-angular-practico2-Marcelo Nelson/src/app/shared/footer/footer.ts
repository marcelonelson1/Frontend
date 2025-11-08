import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss'
})
export class Footer {
  currentYear = new Date().getFullYear();
  
  socialLinks: SocialLink[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/marcelonelson1',
      icon: 'github'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/marcelonelson',
      icon: 'linkedin'
    },
    {
      name: 'Email',
      url: 'mailto:marcelinho.nelson@gmail.com',
      icon: 'email'
    }
  ];

  quickLinks = [
    { label: 'Inicio', route: '/home' },
    { label: 'Sobre Mí', route: '/about' },
    { label: 'Proyectos', route: '/projects' },
    { label: 'Contacto', route: '/contact' }
  ];
}