import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Hero } from '../../curriculum/hero/hero';
import { Skills } from '../../curriculum/skills/skills';
import { ProjectCard } from '../../curriculum/project-card/project-card';

interface FeaturedProject {
  imagen: string;
  titulo: string;
  descripcion: string;
  tags: string[];
}

@Component({
  selector: 'app-home',
  imports: [CommonModule, Hero, Skills, ProjectCard],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  featuredProjects: FeaturedProject[] = [
    {
      imagen: 'https://via.placeholder.com/300x200',
      titulo: 'RMRenders - Plataforma de Cursos',
      descripcion: 'Aplicación web desarrollada desde cero en Go para la gestión y comercialización de cursos de renders 3D.',
      tags: ['go', 'mvc', 'jwt', 'mariadb']
    },
    {
      imagen: 'https://via.placeholder.com/300x200',
      titulo: 'Sistema de Gestión de Gimnasios',
      descripcion: 'Sistema web creado con Go bajo patrón MVC, orientado a la administración integral de gimnasios.',
      tags: ['go', 'echo', 'mysql', 'gorm']
    }
  ];

  onProjectClicked(proyecto: FeaturedProject): void {
    console.log('[Home] Proyecto clickeado:', proyecto.titulo);
    // Aquí se podría agregar lógica adicional, como navegar a detalles del proyecto
  }
}