import { Component } from '@angular/core';
import { LoginRequest } from '../../data-access/models/login-request.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../data-access/services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private authenticationService: AuthenticationService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  onFormSubmit(): void {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      };

      this.authenticationService.login(loginRequest).subscribe({
        next: (loginResponse) => {
          //Set Auth Cookie
          this.cookieService.set(
            'Authorization',
            `Bearer ${loginResponse.token}`,
            undefined,
            '/',
            undefined,
            true,
            'Strict'
          );

          //Set User
          this.authenticationService.setUser({
            email: loginResponse.email,
            roles: loginResponse.roles,
          });

          //Redirect back to home
          this.router.navigateByUrl('/home');
        },
      });
    }
  }
}
