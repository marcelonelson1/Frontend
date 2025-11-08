import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCard } from '../../curriculum/project-card/project-card';

interface Project {
  id: string;
  imagen: string;
  titulo: string;
  descripcion: string;
  tags: string[];
  categoria: string;
  estado: 'completado' | 'en-desarrollo' | 'planificado';
  fechaInicio: string;
  fechaFin?: string;
  repositorio?: string;
  demo?: string;
  destacado: boolean;
}

@Component({
  selector: 'app-projects',
  imports: [CommonModule, ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
  filtroActivo = '';
  categoriaActiva = '';
  estadoActivo = '';
  
  categorias = ['backend', 'fullstack', 'api', 'web'];
  estados = ['completado', 'en-desarrollo', 'planificado'];
  
  proyectos: Project[] = [
    {
      id: 'rmrenders',
      imagen: 'https://via.placeholder.com/400x250',
      titulo: 'RMRenders - Plataforma de Cursos',
      descripcion: 'Aplicación web desarrollada desde cero en Go para la gestión y comercialización de cursos de renders 3D. Incluye sistema de usuarios, pagos, y gestión de contenido.',
      tags: ['go', 'mvc', 'jwt', 'mariadb', 'echo'],
      categoria: 'fullstack',
      estado: 'completado',
      fechaInicio: '2023-06',
      fechaFin: '2023-09',
      repositorio: 'https://github.com/marcelonelson1/rmrenders',
      demo: 'https://rmrenders-demo.com',
      destacado: true
    },
    {
      id: 'gym-system',
      imagen: 'https://via.placeholder.com/400x250',
      titulo: 'Sistema de Gestión de Gimnasios',
      descripcion: 'Sistema web creado con Go bajo patrón MVC, orientado a la administración integral de gimnasios. Manejo de socios, rutinas, pagos y estadísticas.',
      tags: ['go', 'echo', 'mysql', 'gorm', 'mvc'],
      categoria: 'backend',
      estado: 'completado',
      fechaInicio: '2023-10',
      fechaFin: '2024-01',
      repositorio: 'https://github.com/marcelonelson1/gym-system',
      destacado: true
    },
    {
      id: 'hotel-management',
      imagen: 'https://via.placeholder.com/400x250',
      titulo: 'Sistema de Gestión de Hoteles',
      descripcion: 'Sistema web creado con Go bajo patrón MVC, orientado a la administración integral de hoteles. Reservas, habitaciones, huéspedes y facturación.',
      tags: ['go', 'gin', 'postgresql', 'gorm', 'api'],
      categoria: 'backend',
      estado: 'completado',
      fechaInicio: '2024-02',
      fechaFin: '2024-04',
      repositorio: 'https://github.com/marcelonelson1/hotel-system',
      destacado: false
    },
    {
      id: 'api-authentication',
      imagen: 'https://via.placeholder.com/400x250',
      titulo: 'API de Autenticación JWT',
      descripcion: 'API REST completa para autenticación de usuarios con JWT, refresh tokens, roles y permisos. Implementa mejores prácticas de seguridad.',
      tags: ['go', 'jwt', 'redis', 'postgresql', 'docker'],
      categoria: 'api',
      estado: 'completado',
      fechaInicio: '2024-03',
      fechaFin: '2024-05',
      repositorio: 'https://github.com/marcelonelson1/auth-api',
      destacado: false
    },
    {
      id: 'ecommerce-backend',
      imagen: 'https://via.placeholder.com/400x250',
      titulo: 'Backend E-commerce',
      descripcion: 'API completa para e-commerce con Go. Gestión de productos, carrito, órdenes, pagos y administración. Arquitectura limpia y escalable.',
      tags: ['go', 'clean-architecture', 'mysql', 'stripe', 'docker'],
      categoria: 'backend',
      estado: 'en-desarrollo',
      fechaInicio: '2024-05',
      repositorio: 'https://github.com/marcelonelson1/ecommerce-backend',
      destacado: true
    },
    {
      id: 'microservices-demo',
      imagen: 'https://via.placeholder.com/400x250',
      titulo: 'Arquitectura de Microservicios',
      descripcion: 'Demostración de arquitectura de microservicios con Go. Incluye API Gateway, servicios independientes, comunicación entre servicios y observabilidad.',
      tags: ['go', 'microservices', 'docker', 'kubernetes', 'grpc'],
      categoria: 'backend',
      estado: 'planificado',
      fechaInicio: '2024-07',
      repositorio: 'https://github.com/marcelonelson1/microservices-demo',
      destacado: false
    }
  ];

  filtrarProyectos(filtro: string) {
    this.filtroActivo = filtro;
  }

  filtrarPorCategoria(categoria: string) {
    this.categoriaActiva = categoria;
  }

  filtrarPorEstado(estado: string) {
    this.estadoActivo = estado;
  }

  limpiarFiltros() {
    this.filtroActivo = '';
    this.categoriaActiva = '';
    this.estadoActivo = '';
  }

  get proyectosFiltrados() {
    let proyectosFiltrados = this.proyectos;

    // Filtro por tecnología
    if (this.filtroActivo) {
      proyectosFiltrados = proyectosFiltrados.filter(proyecto =>
        proyecto.tags.some(tag => tag.toLowerCase().includes(this.filtroActivo.toLowerCase()))
      );
    }

    // Filtro por categoría
    if (this.categoriaActiva) {
      proyectosFiltrados = proyectosFiltrados.filter(proyecto =>
        proyecto.categoria === this.categoriaActiva
      );
    }

    // Filtro por estado
    if (this.estadoActivo) {
      proyectosFiltrados = proyectosFiltrados.filter(proyecto =>
        proyecto.estado === this.estadoActivo
      );
    }

    return proyectosFiltrados;
  }

  get proyectosDestacados() {
    return this.proyectos.filter(p => p.destacado);
  }

  getEstadoClass(estado: string): string {
    const classes = {
      'completado': 'estado-completado',
      'en-desarrollo': 'estado-desarrollo',
      'planificado': 'estado-planificado'
    };
    return classes[estado as keyof typeof classes] || '';
  }

  onProjectClicked(proyecto: any): void {
    console.log('[Projects] Proyecto seleccionado:', proyecto.titulo);
    // Aquí se podría agregar lógica adicional, como mostrar un modal con detalles
  }
}