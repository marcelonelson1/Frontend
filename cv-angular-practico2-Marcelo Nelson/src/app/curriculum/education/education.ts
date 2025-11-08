import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface EducationItem {
  id: string;
  title: string;
  institution: string;
  period: string;
  description?: string;
  status: 'completed' | 'current' | 'planned';
  achievements?: string[];
}

@Component({
  selector: 'app-education',
  imports: [CommonModule],
  templateUrl: './education.html',
  styleUrl: './education.scss'
})
export class Education {
  educationItems: EducationItem[] = [
    {
      id: 'ing-sistemas',
      title: 'Ingeniería en Sistemas',
      institution: 'Universidad Católica de Córdoba',
      period: '2023 - Actualidad',
      description: '3er año en curso, enfocado en desarrollo de software y arquitectura de sistemas.',
      status: 'current',
      achievements: [
        'Promedio académico: 8.5/10',
        'Proyectos destacados en programación',
        'Participación en grupos de estudio'
      ]
    },
    {
      id: 'bachiller',
      title: 'Bachiller con Especialidad en Comunicación Social',
      institution: 'Escuela Secundaria Costa Azul College',
      period: '2017 - 2022',
      description: 'Educación secundaria completada con orientación en comunicación y medios.',
      status: 'completed',
      achievements: [
        'Graduado con honores',
        'Proyecto final en medios digitales',
        'Certificación en informática básica'
      ]
    },
    {
      id: 'curso-go',
      title: 'Especialización en Go (Golang)',
      institution: 'Autodidacta / Cursos Online',
      period: '2022 - Actualidad',
      description: 'Formación continua en desarrollo backend con Go, frameworks y mejores prácticas.',
      status: 'current',
      achievements: [
        'Dominio de Echo y Gin frameworks',
        'Experiencia con GORM y bases de datos',
        'Implementación de APIs RESTful'
      ]
    }
  ];

  getStatusClass(status: string): string {
    const statusClasses = {
      completed: 'status-completed',
      current: 'status-current',
      planned: 'status-planned'
    };
    return statusClasses[status as keyof typeof statusClasses] || 'status-completed';
  }

  getStatusText(status: string): string {
    const statusTexts = {
      completed: 'Completado',
      current: 'En curso',
      planned: 'Planificado'
    };
    return statusTexts[status as keyof typeof statusTexts] || 'Completado';
  }
}