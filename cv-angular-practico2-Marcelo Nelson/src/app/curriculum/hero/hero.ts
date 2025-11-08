import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface HeroAction {
  label: string;
  route?: string;
  action?: string;
  isPrimary: boolean;
}

@Component({
  selector: 'app-hero',
  imports: [CommonModule, RouterModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss'
})
export class Hero {
  profileData = {
    name: 'Marcelo Nelson',
    initials: 'MN',
    role: 'Desarrollador Backend Junior | Estudiante de Ingeniería en Sistemas',
    description: 'Estudiante de 3er año de Ingeniería en Sistemas y desarrollador backend junior con enfoque en Golang. Me interesa construir soluciones funcionales, bien estructuradas y orientadas a la escalabilidad.',
    currentStatus: 'Disponible para nuevas oportunidades'
  };

  heroActions: HeroAction[] = [
    {
      label: 'Ver Proyectos',
      route: '/projects',
      isPrimary: true
    },
    {
      label: 'Contactar',
      route: '/contact',
      isPrimary: false
    }
  ];

  socialStats = [
    { label: 'Años de experiencia', value: '2+' },
    { label: 'Proyectos completados', value: '10+' },
    { label: 'Tecnologías dominadas', value: '8+' }
  ];

  downloadCV() {
    // Implementar descarga de CV
    console.log('Descargando CV...');
    // Aquí podrías implementar la lógica real de descarga
  }

  executeAction(action: string) {
    if (action === 'downloadCV') {
      this.downloadCV();
    }
  }
}