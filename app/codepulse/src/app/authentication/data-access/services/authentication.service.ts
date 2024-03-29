import { Injectable } from '@angular/core';
import { LoginRequest } from '../models/login-request.model';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { LoginResponse } from '../models/login-response.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AppConfigService } from 'src/app/app-config.service';
import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  $user = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private http: HttpClient,
    private appConfig: AppConfigService,
    private cookieService: CookieService
  ) {}

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(
        `${this.appConfig.config?.apibaseURL}/api/auth/login`,
        loginRequest
      )
      .pipe(catchError(this.handleError));
  }

  setUser(user: User): void {
    //send new value to any subscriber of the observable
    this.$user.next(user);

    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    const email = localStorage.getItem('user-email');
    const roles = localStorage.getItem('user-roles');

    if (email && roles) {
      const user: User = {
        email: email,
        roles: roles.split(','),
      };
      return user;
    }

    return undefined;
  }

  logout(): void {
    localStorage.clear();
    this.cookieService.delete('Authorization', '/');
    this.$user.next(undefined);
  }

  private handleError(error: HttpErrorResponse) {
    let message = '';
    if (error.status === 0) {
      //client side or network error occurred.
      message = `Error: ${error.message}`;
    } else {
      //Backend returned an unsuccessful response code.
      message = error.error;
    }
    //Return an observable with a user-facing message.
    return throwError(() => new Error(message));
  }
}
