import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/app-config.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private http: HttpClient, private appConfig: AppConfigService) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(
      `${this.appConfig.config?.apibaseURL}/api/auth/login`,
      loginRequest
    );
  }

  setUser(user: User): void {
    //send new value to any subscriber of the observable
    this.$user.next(user);

    localStorage.setItem('user-email', user.email);
    localStorage.setItem('roles', user.roles.join(','));
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }
}
