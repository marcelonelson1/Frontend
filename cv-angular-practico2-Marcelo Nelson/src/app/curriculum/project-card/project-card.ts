import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Card } from 'primeng/card';
import { Chip } from 'primeng/chip';

interface Proyecto {
  imagen: string;
  titulo: string;
  descripcion: string;
  tags: string[];
}

@Component({
  selector: 'app-project-card',
  imports: [CommonModule, Card, Chip],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss'
})
export class ProjectCard {
  // @Input permite recibir datos del componente padre
  @Input() proyecto!: Proyecto;
  @Input() showTags: boolean = true;

  // @Output permite emitir eventos al componente padre
  @Output() projectClick = new EventEmitter<Proyecto>();

  onProjectClick(): void {
    this.projectClick.emit(this.proyecto);
  }
}