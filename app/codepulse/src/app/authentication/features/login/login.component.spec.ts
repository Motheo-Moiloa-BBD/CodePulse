import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { CookieService } from 'ngx-cookie-service';
import { AuthenticationService } from '../../data-access/services/authentication.service';
import { Router, Routes } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from 'src/app/home/features/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { MockAuthenticationService } from 'src/app/mocking/authentication-service-mock';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let cookieService: CookieService;
  let authenticationService: AuthenticationService;
  let router: Router;
  let debugElement: DebugElement;
  let loginForm: HTMLElement;
  let submitButton: HTMLButtonElement;
  let location: Location;

  beforeEach(waitForAsync(() => {
    const routes: Routes = [
      {
        path: 'home',
        component: HomeComponent,
      },
    ];

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
      ],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
      ],
      declarations: [LoginComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    cookieService = TestBed.inject(CookieService);
    authenticationService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    debugElement = fixture.debugElement;

    loginForm = debugElement.query(By.css('form')).nativeElement;
    submitButton = loginForm.querySelector('.submit')!;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display login heading on render', () => {
    const h1: HTMLElement = debugElement.query(By.css('h1')).nativeElement;

    expect(h1.textContent).toEqual('Login');
  });

  it('form should be invalid when required fields are empty', () => {
    component.loginForm.controls.email.setValue('');
    component.loginForm.controls.password.setValue('');

    fixture.detectChanges();

    expect(component.loginForm.valid).toBeFalsy();
  });

  it('form should be invalid when wrong format of email is entered', () => {
    component.loginForm.controls.email.setValue('abc');
    component.loginForm.controls.password.setValue('abc@123');

    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should submit form when requried fields are not empty and redirect to the home component', fakeAsync(() => {
    component.loginForm.controls.email.setValue('mock@mock.co.za');
    component.loginForm.controls.password.setValue('mock@123');

    expect(component.loginForm.valid).toBeTruthy();

    submitButton.click();

    fixture.detectChanges();

    tick();

    expect(location.path()).toBe(`/home`);
  }));
});
