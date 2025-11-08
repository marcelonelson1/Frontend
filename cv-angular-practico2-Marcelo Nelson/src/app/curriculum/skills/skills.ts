import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chip } from 'primeng/chip';
import { Card } from 'primeng/card';

interface SkillCategory {
  title: string;
  skills: Skill[];
}

interface Skill {
  name: string;
  level: 'basic' | 'intermediate' | 'advanced';
  isPrimary?: boolean;
}

@Component({
  selector: 'app-skills',
  imports: [CommonModule, Chip, Card],
  templateUrl: './skills.html',
  styleUrl: './skills.scss'
})
export class Skills {
  skillCategories: SkillCategory[] = [
    {
      title: 'Lenguajes de Programación',
      skills: [
        { name: 'Go', level: 'intermediate', isPrimary: true },
        { name: 'JavaScript', level: 'intermediate' },
        { name: 'TypeScript', level: 'basic' },
        { name: 'HTML', level: 'advanced' },
        { name: 'CSS', level: 'advanced' }
      ]
    },
    {
      title: 'Frameworks & Librerías',
      skills: [
        { name: 'Angular', level: 'intermediate' },
        { name: 'React', level: 'basic' },
        { name: 'Echo (Go)', level: 'intermediate' },
        { name: 'Gin (Go)', level: 'intermediate' },
        { name: 'GORM', level: 'intermediate' }
      ]
    },
    {
      title: 'Bases de Datos',
      skills: [
        { name: 'MySQL', level: 'intermediate' },
        { name: 'MariaDB', level: 'intermediate' },
        { name: 'PostgreSQL', level: 'basic' }
      ]
    },
    {
      title: 'Herramientas & Otros',
      skills: [
        { name: 'Git', level: 'advanced' },
        { name: 'GitHub', level: 'advanced' },
        { name: 'Linux', level: 'intermediate' },
        { name: 'Docker', level: 'basic' },
        { name: 'Clean Architecture', level: 'intermediate' },
        { name: 'MVC', level: 'advanced' },
        { name: 'Redes', level: 'intermediate' },
        { name: 'Ciberseguridad', level: 'basic' }
      ]
    }
  ];

  getLevelColor(level: string): string {
    const colors = {
      basic: '#6b7280',
      intermediate: '#f59e0b',
      advanced: '#10b981'
    };
    return colors[level as keyof typeof colors] || '#6b7280';
  }
}