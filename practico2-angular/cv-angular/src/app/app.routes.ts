import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Curriculum } from './components/curriculum/curriculum';
import { Artworks } from './components/artworks/artworks';
import { Contact } from './components/contact/contact';
import { authGuard } from './guards/auth-guard';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login },
  { path: 'curriculum', component: Curriculum, canActivate: [authGuard] },
  { path: 'artworks', component: Artworks, canActivate: [authGuard] },
  { path: 'contact', component: Contact, canActivate: [authGuard] },
  { path: '**', redirectTo: '/home' }
];
