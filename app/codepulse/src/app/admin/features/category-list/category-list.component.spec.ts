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
import { of, throwError } from 'rxjs';
import { mockCategories } from 'src/app/mocking/mock-categories';
import { EditCategoryComponent } from '../edit-category/edit-category.component';

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
      {
        path: 'admin/categories/:id',
        component: EditCategoryComponent,
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
    const addCategoryAnchor: HTMLElement[] =
      fixture.debugElement.nativeElement.querySelectorAll('a');

    addCategoryAnchor[0].click();

    tick();

    fixture.detectChanges();

    expect(location.path()).toBe('/admin/categories/add');
  }));

  it('should not render a table of categories when categories$ has an error', () => {
    component.categories$ = throwError(() => new Error('Error occurred'));

    fixture.detectChanges();

    const tableElement = fixture.debugElement.query(By.css('table'));
    expect(tableElement).toBeFalsy();
  });

  it('should render a table with the correct categories', () => {
    const tableRows = fixture.debugElement.queryAll(By.css('tbody tr'));

    expect(tableRows.length).toEqual(4);

    //check category data in the table
    expect(tableRows[0].nativeElement.textContent).toContain(
      `${mockCategories[0].id}`
    );
    expect(tableRows[1].nativeElement.textContent).toContain(
      `${mockCategories[1].id}`
    );
    expect(tableRows[2].nativeElement.textContent).toContain(
      `${mockCategories[2].id}`
    );
    expect(tableRows[3].nativeElement.textContent).toContain(
      `${mockCategories[3].id}`
    );
  });

  it('should navigate to edit category page when edit category anchor is clicked', fakeAsync(() => {
    const editCategoryAnchor: HTMLElement[] =
      fixture.debugElement.nativeElement.querySelectorAll('a');

    editCategoryAnchor[1].click();

    tick();

    fixture.detectChanges();

    expect(location.path()).toBe(`/admin/categories/${mockCategories[0].id}`);
  }));
});
