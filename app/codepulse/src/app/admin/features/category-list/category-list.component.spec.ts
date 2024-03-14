import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { CategoryListComponent } from './category-list.component';
import { CategoryService } from '../../data-access/services/category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockCategoryService } from 'src/app/mocking/category-service-mock';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Router, Routes } from '@angular/router';
import { AddCategoryComponent } from '../add-category/add-category.component';
import { Location } from '@angular/common';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;
  let categoryService: CategoryService;
  let router: Router;
  let location: Location;

  //used async since compileComponents() is asynchronous
  beforeEach(waitForAsync(() => {
    const routes: Routes = [
      {
        path: 'admin/categories/add',
        component: AddCategoryComponent,
      },
    ];

    TestBed.configureTestingModule({
      declarations: [CategoryListComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [{ provide: CategoryService, useClass: mockCategoryService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;

    categoryService = TestBed.inject(CategoryService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    //sets up initial navigation
    router.initialNavigation();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Class Testing
  it('should get all categories', () => {
    component.ngOnInit();
    fixture.detectChanges();

    categoryService.getAllCategories().subscribe({
      next: (categories) => {
        expect(categories.length).toEqual(4);
      },
    });
  });

  //DOM interactions : HTML template unit tests
  it('should display category list heading on render', () => {
    const headingDe: DebugElement = fixture.debugElement;
    const h1De = headingDe.query(By.css('h1'));
    const h1: HTMLElement = h1De.nativeElement;

    //h1 element should render the heading
    expect(h1.textContent).toEqual('Category List');
  });

  it('should navigate to add category page when add category anchor is clicked', fakeAsync(() => {
    const anchorDE: DebugElement = fixture.debugElement;
    const aDe = anchorDE.query(By.css('a'));
    const anchorWithRouterLink: HTMLElement = aDe.nativeElement;

    anchorWithRouterLink.click();

    tick();

    fixture.detectChanges();

    expect(location.path()).toBe('/admin/categories/add');
  }));

  xit('should not render a list of categories when categories$ is undefined', () => {});

  xit('should render a list of categories when categories$ is defined', () => {});

  xit('should navigate to edit category page when edit category anchor is clicked', () => {});
});
