import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { EditCategoryComponent } from './edit-category.component';
import { CategoryService } from '../../data-access/services/category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockCategoryService } from 'src/app/mocking/category-service-mock';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CategoryListComponent } from '../category-list/category-list.component';
import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { Category } from '../../data-access/models/category.model';
import { mockCategories } from 'src/app/mocking/mock-categories';

describe('EditCategoryComponent', () => {
  let component: EditCategoryComponent;
  let fixture: ComponentFixture<EditCategoryComponent>;
  let categoryService: CategoryService;
  let router: Router;
  let route: ActivatedRoute;
  let location: Location;
  let debugElement: DebugElement;
  let editCategoryForm: HTMLElement;
  let saveButton: HTMLButtonElement;
  let deleteButton: HTMLButtonElement;

  beforeEach(waitForAsync(() => {
    const routes: Routes = [
      {
        path: 'admin/categories',
        component: CategoryListComponent,
      },
    ];

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
      ],
      declarations: [EditCategoryComponent],
      providers: [
        { provide: CategoryService, useClass: MockCategoryService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '2EDAEA58-5B28-4CE5-4695-08DC2D5B8A1D' },
            },
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(EditCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCategoryComponent);
    component = fixture.componentInstance;

    categoryService = TestBed.inject(CategoryService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    location = TestBed.inject(Location);

    debugElement = fixture.debugElement;

    //ngOnInit()
    fixture.detectChanges();

    editCategoryForm = debugElement.query(By.css('form')).nativeElement;
    saveButton = editCategoryForm.querySelector('.save')!;
    deleteButton = editCategoryForm.querySelector('.delete')!;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Class testing

  it('should have the correct category after component is loaded', () => {
    expect(component.id).toEqual(mockCategories[0].id);
    expect(component.category).toEqual(mockCategories[0]);
  });

  it('should load correct values on the edit blogpost form', () => {
    expect(component.editCategoryForm.controls.id.value).toEqual(
      mockCategories[0].id
    );
    expect(component.editCategoryForm.controls.name.value).toEqual(
      mockCategories[0].name
    );
    expect(component.editCategoryForm.controls.urlHandle.value).toEqual(
      mockCategories[0].urlHandle
    );
  });

  //DOM interaction testing
  it('should display edit category heading on render', () => {
    const h1De: DebugElement = debugElement.query(By.css('h1'));
    const h1: HTMLElement = h1De.nativeElement;

    //h1 element should render the heading
    expect(h1.textContent).toEqual('Edit Category');
  });

  it('should submit form and navigate to category list page', fakeAsync(() => {
    saveButton.click();
    fixture.detectChanges();
    tick();
    expect(location.path()).toBe(`/admin/categories`);
  }));

  it('should delete category and navigate to category list', fakeAsync(() => {
    deleteButton.click();
    fixture.detectChanges();
    tick();
    expect(location.path()).toBe(`/admin/categories`);
  }));

  it('should render not found section when category is undefined', () => {
    component.category = undefined;
    fixture.detectChanges();
    const notFound: HTMLElement = debugElement.query(
      By.css('.notFound')
    ).nativeElement;
    expect(notFound).toBeTruthy();
  });
});
