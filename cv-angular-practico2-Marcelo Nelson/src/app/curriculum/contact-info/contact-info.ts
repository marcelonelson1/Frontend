import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ContactItem {
  icon: string;
  text: string;
  link?: string;
  type: 'phone' | 'email' | 'location' | 'github';
}

@Component({
  selector: 'app-contact-info',
  imports: [CommonModule],
  templateUrl: './contact-info.html',
  styleUrl: './contact-info.scss'
})
export class ContactInfo {
  contactItems: ContactItem[] = [
    {
      icon: 'phone',
      text: '+54 3513882695',
      type: 'phone'
    },
    {
      icon: 'email',
      text: 'marcelinho.nelson@gmail.com',
      type: 'email'
    },
    {
      icon: 'location',
      text: 'Córdoba, Argentina',
      type: 'location'
    },
    {
      icon: 'github',
      text: 'github.com/marcelonelson1',
      link: 'https://github.com/marcelonelson1',
      type: 'github'
    }
  ];
}