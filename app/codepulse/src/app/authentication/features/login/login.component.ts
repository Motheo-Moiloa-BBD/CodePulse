import { Component } from '@angular/core';
import { LoginRequest } from '../../data-access/models/login-request.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../data-access/services/authentication.service';

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

  constructor(private authenticationService: AuthenticationService) {}

  onFormSubmit(): void {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        email: this.loginForm.value.email!,
        password: this.loginForm.value.password!,
      };

      this.authenticationService.login(loginRequest).subscribe({
        next: (loginResponse) => {
          console.log(loginResponse);
        },
      });
    }
  }
}
