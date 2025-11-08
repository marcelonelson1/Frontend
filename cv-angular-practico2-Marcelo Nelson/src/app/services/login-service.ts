import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of, map } from 'rxjs';
import { LoginRequest, LoginResponse, TokenValidationResponse, User, ErrorResponse } from '../models/auth.model';

// A service is injectable by nature
// because of the @Injectable decorator
// provided in root means that this service
// is a singleton and can be injected anywhere
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private http = inject(HttpClient);
  private router = inject(Router);
  
  // Base URL for the auth API
  private readonly baseUrl = 'http://localhost:8001/api/auth';

  // Signals to manage authentication state
  private loggedIn = signal(false);
  private currentUser = signal<User | null>(null);
  private authToken = signal<string | null>(null);
  private isLoading = signal(false);

  // Computed properties exposed to components
  public readonly isLoggedIn = computed(() => this.loggedIn());
  public readonly user = computed(() => this.currentUser());
  public readonly loading = computed(() => this.isLoading());

  constructor() {
    // Check for existing token on service initialization
    this.checkExistingToken();
  }

  private checkExistingToken() {
    const token = localStorage.getItem('auth_token');
    if (token) {
      this.authToken.set(token);
      this.validateToken().subscribe();
    }
  }

  login(credentials: LoginRequest): Observable<boolean> {
    this.isLoading.set(true);
    
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, credentials).pipe(
      tap((response) => {
        // Store token and user data
        localStorage.setItem('auth_token', response.token);
        this.authToken.set(response.token);
        this.currentUser.set(response.user);
        this.loggedIn.set(true);
        this.isLoading.set(false);
      }),
      catchError((error) => {
        console.error('Login error:', error);
        this.isLoading.set(false);
        this.loggedIn.set(false);
        return of(false);
      }),
      map(() => true)
    );
  }

  logout() {
    // Clear all authentication data
    localStorage.removeItem('auth_token');
    this.authToken.set(null);
    this.currentUser.set(null);
    this.loggedIn.set(false);
    
    // Redirect to home
    this.router.navigateByUrl('/home');
  }

  validateToken(): Observable<boolean> {
    const token = this.authToken();
    if (!token) {
      this.loggedIn.set(false);
      return of(false);
    }

    return this.http.post<TokenValidationResponse>(`${this.baseUrl}/validate-token`, {}).pipe(
      tap((response) => {
        if (response.valid) {
          this.currentUser.set(response.user);
          this.loggedIn.set(true);
        } else {
          this.logout();
        }
      }),
      catchError((error) => {
        console.error('Token validation error:', error);
        this.logout();
        return of(false);
      }),
      map((response: any) => response?.valid || false)
    );
  }

  getToken(): string | null {
    return this.authToken();
  }
}
