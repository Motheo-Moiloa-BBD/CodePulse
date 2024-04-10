import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { NavBarComponent } from './nav-bar.component';
import { AuthenticationService } from 'src/app/authentication/data-access/services/authentication.service';
import { Router, RouterModule, Routes } from '@angular/router';
import { DebugElement } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from 'src/app/home/features/home/home.component';
import { MockAuthenticationService } from 'src/app/mocking/authentication-service-mock';
import { By } from '@angular/platform-browser';
import { LoginComponent } from 'src/app/authentication/features/login/login.component';
import { SpinnerComponent } from '../../ui/spinner/spinner.component';
import {
  mockLoginResponses,
  mockUsers,
} from 'src/app/mocking/mock-authentication';
import { CategoryListComponent } from 'src/app/admin/features/category-list/category-list.component';
import { BlogPostListComponent } from 'src/app/admin/features/blog-post-list/blog-post-list.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let authenticationService: AuthenticationService;
  let router: Router;
  let debugElement: DebugElement;
  let location: Location;

  beforeEach(waitForAsync(() => {
    const routes: Routes = [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'auth/login',
        component: LoginComponent,
      },
      {
        path: 'admin/categories',
        component: CategoryListComponent,
      },
      {
        path: 'admin/blogposts',
        component: BlogPostListComponent,
      },
    ];

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot(routes),
        CommonModule,
      ],
      declarations: [
        NavBarComponent,
        HomeComponent,
        LoginComponent,
        SpinnerComponent,
        CategoryListComponent,
        BlogPostListComponent,
      ],
      providers: [
        { provide: AuthenticationService, useClass: MockAuthenticationService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;

    authenticationService = TestBed.inject(AuthenticationService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    debugElement = fixture.debugElement;

    //ngOnInit()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to home component when codepulse brand is clicked', fakeAsync(() => {
    const a: HTMLAnchorElement = debugElement.query(
      By.css('.brand-home')
    ).nativeElement;

    a.click();

    fixture.detectChanges();

    tick();

    expect(location.path()).toEqual('/home');
  }));

  it('should redirect to home component when home menu item is clicked', fakeAsync(() => {
    const a: HTMLAnchorElement = debugElement.query(
      By.css('.home')
    ).nativeElement;

    a.click();

    fixture.detectChanges();

    tick();

    expect(location.path()).toEqual('/home');
  }));

  it('should logout the user if they are logged in', fakeAsync(() => {
    const logoutButton: HTMLButtonElement = debugElement.query(
      By.css('.logout')
    ).nativeElement;

    logoutButton.click();

    fixture.detectChanges();

    tick();

    expect(localStorage.getItem('user-email')).toBeNull();
    expect(localStorage.getItem('user-roles')).toBeNull();
    expect(location.path()).toEqual('/home');
  }));

  it('should not show admin menu when user has no writer roles', () => {
    const adminView = debugElement.query(By.css('.admin'));
    expect(adminView).toBeNull();
  });

  it('should show admin menu when user has writer roles and redirect them to the correct admin pages when those menu items are clicked', fakeAsync(() => {
    authenticationService.logout();

    fixture.detectChanges();

    tick();

    authenticationService
      .login({
        email: 'mockAdmin@mock.co.za',
        password: 'mockAdmin@123',
      })
      .subscribe({
        next: (loginResponse) => {
          expect(loginResponse).toEqual(mockLoginResponses[1]);
          authenticationService.setUser(mockUsers[0]);
        },
      });

    fixture.detectChanges();

    tick();

    const adminView: HTMLElement = debugElement.query(
      By.css('.admin')
    ).nativeElement;

    expect(adminView).toBeTruthy();

    const categorylistAnchor: HTMLElement =
      adminView.querySelector('.categories')!;
    const blogpostlistAnchor: HTMLElement =
      adminView.querySelector('.blogposts')!;

    categorylistAnchor.click();
    fixture.detectChanges();
    tick();

    expect(location.path()).toEqual('/admin/categories');

    fixture.detectChanges();
    tick();

    blogpostlistAnchor.click();
    fixture.detectChanges();
    tick();

    expect(location.path()).toEqual('/admin/blogposts');
  }));

  it('should redirect the user to the login page when login anchor element is clicked and there is no user logged in', fakeAsync(() => {
    authenticationService.logout();

    fixture.detectChanges();

    tick();

    const loginButton: HTMLButtonElement = debugElement.query(
      By.css('.login')
    ).nativeElement;

    loginButton.click();

    fixture.detectChanges();

    tick();

    expect(location.path()).toEqual('/auth/login');
  }));
});
