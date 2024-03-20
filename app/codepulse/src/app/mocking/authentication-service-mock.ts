import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from '../authentication/data-access/models/user.model';
import { LoginRequest } from '../authentication/data-access/models/login-request.model';
import { LoginResponse } from '../authentication/data-access/models/login-response.model';
import { mockLoginResponses } from './mock-authentication';

export class MockAuthenticationService {
  $user = new BehaviorSubject<User | undefined>(undefined);

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return of(mockLoginResponses[0]);
  }

  setUser(user: User): void {
    this.$user.next(user);
  }
}
