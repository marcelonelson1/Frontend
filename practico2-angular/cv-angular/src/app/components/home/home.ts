import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [RouterLink, Card, Button],
  templateUrl: './home.html',
  styleUrl: './home.css',
  standalone: true
})
export class Home {
  // Signal para demostrar su uso
  welcomeMessage = signal<string>('Bienvenido a mi portafolio profesional');
  features = signal<string[]>([
    'Curriculum Vitae Completo',
    'Galería de Obras de Arte',
    'Formulario de Contacto',
    'Autenticación con Guards'
  ]);
}
