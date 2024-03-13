import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AppConfigService } from 'src/app/app-config.service';
import { MockAppConfigService } from 'src/app/mocking/app-config-mock';
import { CookieService } from 'ngx-cookie-service';
import { LoginRequest } from '../models/login-request.model';
import {
  mockLoginResponses,
  mockUsers,
} from 'src/app/mocking/mock-authentication';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CookieService', ['delete', 'get']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthenticationService,
        { provide: AppConfigService, useClass: MockAppConfigService },
        { provide: CookieService, useValue: spy },
      ],
    }).compileComponents();

    service = TestBed.inject(AuthenticationService);
    cookieServiceSpy = TestBed.inject(
      CookieService
    ) as jasmine.SpyObj<CookieService>;
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login the user', () => {
    const mockLoginRequest: LoginRequest = {
      email: 'mock@mock.co.za',
      password: 'mock@mock',
    };

    service.login(mockLoginRequest).subscribe({
      next: (loginResponse) => {
        expect(loginResponse).toEqual(mockLoginResponses[0]);
      },
    });

    const mockRequest = httpMock.expectOne(
      `https://localhost:7097/api/auth/login`
    );

    expect(mockRequest.request.method).toEqual('POST');

    mockRequest.flush(mockLoginResponses[0]);
  });

  it('should set user', async () => {
    service.setUser(mockUsers[1]);

    expect(localStorage.length).toEqual(2);
    expect(localStorage.getItem('user-email')).toBeDefined();
    expect(localStorage.getItem('user-roles')).toBeDefined();

    service.user().subscribe({
      next: (user) => {
        expect(user).toEqual(mockUsers[1]);
      },
    });
  });

  it('should return a user', () => {
    service.setUser(mockUsers[1]);

    const mockUser = service.getUser();
    expect(mockUser).toEqual(mockUsers[1]);
    expect(mockUser).toBeDefined();
    expect(mockUser?.email).toBeDefined();
    expect(mockUser?.roles).toBeDefined();
  });

  it('should return undefined when the email and roles is undefined', () => {
    expect(service.getUser()).toBeUndefined();
  });

  it('should logout a user', () => {
    service.logout();

    expect(cookieServiceSpy.get('Authorization')).toBeUndefined();
    expect(localStorage.length).toEqual(0);
    service.user().subscribe({
      next: (user) => {
        expect(user).toBeUndefined();
      },
    });
  });
});
