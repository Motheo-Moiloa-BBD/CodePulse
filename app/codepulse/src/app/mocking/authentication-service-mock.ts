import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../authentication/data-access/models/user.model';
import { LoginRequest } from '../authentication/data-access/models/login-request.model';
import { LoginResponse } from '../authentication/data-access/models/login-response.model';
import { mockLoginResponses, mockUsers } from './mock-authentication';

export class MockAuthenticationService {
  $user = new BehaviorSubject<User | undefined>(undefined);

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    if (loginRequest.email === 'mockAdmin@mock.co.za') {
      return of(mockLoginResponses[1]);
    } else {
      return of(mockLoginResponses[0]);
    }
  }

  setUser(user: User): void {
    this.$user.next(user);
    localStorage.setItem('user-email', user.email);
    localStorage.setItem('user-roles', user.roles.join(','));
  }

  user(): Observable<User | undefined> {
    return this.$user.asObservable();
  }

  getUser(): User | undefined {
    return mockUsers[1];
  }

  logout(): void {
    localStorage.clear();
    this.$user.next(undefined);
  }
}
