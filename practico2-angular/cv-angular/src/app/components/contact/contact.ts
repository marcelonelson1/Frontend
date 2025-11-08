import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Card } from 'primeng/card';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-contact',
  imports: [Card, InputText, Button, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  standalone: true
})
export class Contact implements OnInit {
  contactForm!: FormGroup;
  submitted = signal<boolean>(false);
  successMessage = signal<string>('');

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    console.log('Contact component initialized');
    this.initializeForm();
  }

  initializeForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  onSubmit(): void {
    this.submitted.set(true);

    if (this.contactForm.valid) {
      console.log('Form submitted:', this.contactForm.value);
      this.successMessage.set('Mensaje enviado exitosamente! Gracias por contactarme.');

      // Resetear formulario después de 3 segundos
      setTimeout(() => {
        this.contactForm.reset();
        this.submitted.set(false);
        this.successMessage.set('');
      }, 3000);
    } else {
      console.log('Form is invalid');
    }
  }

  // Getters para facilitar el acceso a los controles del formulario
  get name() { return this.contactForm.get('name'); }
  get email() { return this.contactForm.get('email'); }
  get subject() { return this.contactForm.get('subject'); }
  get message() { return this.contactForm.get('message'); }
}
