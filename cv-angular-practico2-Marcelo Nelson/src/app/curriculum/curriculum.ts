import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ProjectCard } from './project-card/project-card';

@Component({
  selector: 'app-curriculum',
  imports: [CommonModule, RouterOutlet, ProjectCard],
  templateUrl: './curriculum.html',
  styleUrl: './curriculum.scss'
})
export class Curriculum {
  // Estados para eventos condicionales
  mostrarTags = true;
  modoVista = 'grid'; // 'grid' o 'list'
  filtroActivo = '';

  proyectos = [
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
    },
    {
      imagen: 'https://via.placeholder.com/300x200',
      titulo: 'Sistema de Gestión de hoteles',
      descripcion: 'Sistema web creado con Go bajo patrón MVC, orientado a la administración integral de gimnasios.',
      tags: ['go', 'echo', 'mysql', 'gorm']
    }
  ];

  // Métodos para eventos condicionales
  toggleTags() {
    this.mostrarTags = !this.mostrarTags;
  }

  cambiarVista(modo: string) {
    this.modoVista = modo;
  }

  filtrarProyectos(filtro: string) {
    this.filtroActivo = filtro;
  }

  // Getter que filtra proyectos según el filtro activo
  get proyectosFiltrados() {
    if (!this.filtroActivo) return this.proyectos;
    
    return this.proyectos.filter(proyecto => 
      proyecto.tags.includes(this.filtroActivo.toLowerCase())
    );
  }
}
