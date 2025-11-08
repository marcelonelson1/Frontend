import { Component, OnInit, signal } from '@angular/core';
import { UpperCasePipe, DatePipe } from '@angular/common';
import { Card } from 'primeng/card';
import { PhoneFormatPipe } from '../../pipes/phone-format-pipe';

interface Education {
  institution: string;
  degree: string;
  period: string;
}

interface Skill {
  name: string;
  level: string;
}

@Component({
  selector: 'app-curriculum',
  imports: [Card, UpperCasePipe, DatePipe, PhoneFormatPipe],
  templateUrl: './curriculum.html',
  styleUrl: './curriculum.css',
  standalone: true
})
export class Curriculum implements OnInit {
  // Datos personales con signals
  personalInfo = signal({
    name: 'Emanuel Boz',
    age: 20,
    email: 'emanuel.boz@gmail.com',
    phone: '543511234567',
    location: 'Córdoba, Argentina'
  });

  // Educación
  education = signal<Education[]>([
    {
      institution: 'Universidad Católica de Córdoba',
      degree: 'Ingeniería en Sistemas',
      period: '2024 - Presente'
    }
  ]);

  // Habilidades técnicas
  skills = signal<Skill[]>([
    { name: 'Angular', level: 'Intermedio' },
    { name: 'TypeScript', level: 'Intermedio' },
    { name: 'HTML5 & CSS3', level: 'Avanzado' },
    { name: 'JavaScript', level: 'Intermedio' },
    { name: 'Git', level: 'Intermedio' },
    { name: 'PrimeNG', level: 'Básico' }
  ]);

  currentDate = new Date();

  ngOnInit(): void {
    console.log('Curriculum component initialized');
  }
}
