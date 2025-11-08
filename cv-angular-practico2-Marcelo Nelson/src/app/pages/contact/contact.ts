import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactInfo } from '../../curriculum/contact-info/contact-info';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { MessageModule } from 'primeng/message';
import { CardModule } from 'primeng/card';

interface ContactMethod {
  icon: string;
  title: string;
  description: string;
  value: string;
  link?: string;
  action?: () => void;
}

@Component({
  selector: 'app-contact',
  imports: [CommonModule, ReactiveFormsModule, ContactInfo, InputTextModule, ButtonModule, SelectModule, MessageModule, CardModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  subjectOptions = [
    { label: 'Selecciona un asunto', value: '' },
    { label: 'Oportunidad Laboral', value: 'trabajo' },
    { label: 'Colaboración en Proyecto', value: 'proyecto' },
    { label: 'Trabajo Freelance', value: 'freelance' },
    { label: 'Consulta Técnica', value: 'consulta' },
    { label: 'Mentoría', value: 'mentoria' },
    { label: 'Otro', value: 'otro' }
  ];

  priorityOptions = [
    { label: 'Baja', value: 'low' },
    { label: 'Normal', value: 'normal' },
    { label: 'Alta', value: 'high' },
    { label: 'Urgente', value: 'urgent' }
  ];

  preferredContactOptions = [
    { label: 'Email', value: 'email' },
    { label: 'Teléfono', value: 'phone' },
    { label: 'WhatsApp', value: 'whatsapp' },
    { label: 'LinkedIn', value: 'linkedin' }
  ];

  availabilityOptions = [
    { label: 'Sin preferencia', value: '' },
    { label: 'Mañana (9-12)', value: 'morning' },
    { label: 'Tarde (13-17)', value: 'afternoon' },
    { label: 'Noche (18-21)', value: 'evening' },
    { label: 'Flexible', value: 'flexible' }
  ];

  contactMethods: ContactMethod[] = [
    {
      icon: '📧',
      title: 'Email',
      description: 'Respondo en 24-48 horas',
      value: 'marcelinho.nelson@gmail.com',
      link: 'mailto:marcelinho.nelson@gmail.com'
    },
    {
      icon: '📱',
      title: 'WhatsApp',
      description: 'Respuesta rápida',
      value: '+54 351 388 2695',
      link: 'https://wa.me/5493513882695'
    },
    {
      icon: '💼',
      title: 'LinkedIn',
      description: 'Conexión profesional',
      value: 'Marcelo Nelson',
      link: 'https://linkedin.com/in/marcelonelson'
    },
    {
      icon: '🐙',
      title: 'GitHub',
      description: 'Revisa mi código',
      value: 'marcelonelson1',
      link: 'https://github.com/marcelonelson1'
    }
  ];

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[\+]?[0-9\s\-\(\)]*$/)]],
      company: [''],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]],
      priority: ['normal'],
      preferredContact: ['email'],
      availability: ['']
    });
  }

  get formControls() {
    return this.contactForm.controls;
  }

  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${fieldName} es requerido`;
      if (field.errors['email']) return 'Email inválido';
      if (field.errors['minlength']) return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['maxlength']) return `Máximo ${field.errors['maxlength'].requiredLength} caracteres`;
      if (field.errors['pattern']) return 'Formato inválido';
    }
    return '';
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field?.invalid && field.touched);
  }

  onSubmit() {
    if (this.contactForm.valid) {
      this.isSubmitting = true;
      this.submitError = '';
      
      // Simular envío del formulario
      setTimeout(() => {
        try {
          console.log('Formulario enviado:', this.contactForm.value);
          this.submitSuccess = true;
          this.contactForm.reset();
          this.contactForm.patchValue({
            priority: 'normal',
            preferredContact: 'email'
          });
        } catch (error) {
          this.submitError = 'Error al enviar el mensaje. Por favor, intenta nuevamente.';
        } finally {
          this.isSubmitting = false;
        }
      }, 2000);
    } else {
      // Marcar todos los campos como touched para mostrar errores
      Object.keys(this.contactForm.controls).forEach(key => {
        this.contactForm.get(key)?.markAsTouched();
      });
    }
  }

  resetForm() {
    this.contactForm.reset();
    this.contactForm.patchValue({
      priority: 'normal',
      preferredContact: 'email'
    });
    this.submitSuccess = false;
    this.submitError = '';
  }

  openContactMethod(method: ContactMethod) {
    if (method.link) {
      window.open(method.link, '_blank');
    } else if (method.action) {
      method.action();
    }
  }
}