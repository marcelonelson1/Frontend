import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactInfo } from '../../curriculum/contact-info/contact-info';
import { Languages } from '../../curriculum/languages/languages';
import { Education } from '../../curriculum/education/education';

interface SoftSkill {
  skill: string;
  description: string;
  icon: string;
}

@Component({
  selector: 'app-about',
  imports: [CommonModule, ContactInfo, Languages, Education],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class About {
  softSkills: SoftSkill[] = [
    {
      skill: 'Pensamiento lógico y resolución de problemas',
      description: 'Capacidad para analizar problemas complejos y encontrar soluciones eficientes',
      icon: '🧠'
    },
    {
      skill: 'Autonomía y capacidad de aprendizaje autodidacta',
      description: 'Habilidad para aprender nuevas tecnologías de forma independiente',
      icon: '📚'
    },
    {
      skill: 'Organización y manejo del tiempo',
      description: 'Gestión eficiente de proyectos y deadlines',
      icon: '⏰'
    },
    {
      skill: 'Trabajo en equipo y colaboración interdisciplinaria',
      description: 'Experiencia trabajando con equipos diversos y multidisciplinarios',
      icon: '🤝'
    },
    {
      skill: 'Actitud proactiva y compromiso con la mejora continua',
      description: 'Búsqueda constante de mejores prácticas y optimización',
      icon: '🚀'
    }
  ];

  personalValues = [
    'Calidad en el código',
    'Escalabilidad',
    'Seguridad',
    'Performance',
    'Documentación clara',
    'Testing'
  ];
}