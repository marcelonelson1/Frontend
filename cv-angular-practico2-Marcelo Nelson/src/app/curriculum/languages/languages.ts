import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Language {
  name: string;
  level: string;
  levelClass: 'native' | 'intermediate' | 'basic';
  percentage: number;
}

@Component({
  selector: 'app-languages',
  imports: [CommonModule],
  templateUrl: './languages.html',
  styleUrl: './languages.scss'
})
export class Languages {
  languages: Language[] = [
    {
      name: 'Español',
      level: 'Nativo',
      levelClass: 'native',
      percentage: 100
    },
    {
      name: 'Inglés',
      level: 'Intermedio',
      levelClass: 'intermediate',
      percentage: 75
    },
    {
      name: 'Portugués',
      level: 'Intermedio',
      levelClass: 'intermediate',
      percentage: 70
    }
  ];
}