import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login-service';

@Component({
  selector: 'app-using-service',
  imports: [],
  templateUrl: './using-service-component.html',
  styleUrl: './using-service-component.scss'
})
export class UsingService {

  // Injecting the LoginService to manage user authentication state
  loginService = inject(LoginService);


  doLogin() {
    if (this.loginService.isLoggedIn()) {
      this.loginService.logout();
    } else {
      this.loginService.login();
    }
  }

}
