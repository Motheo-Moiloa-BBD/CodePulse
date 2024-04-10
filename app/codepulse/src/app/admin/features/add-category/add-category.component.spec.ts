import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { AddCategoryComponent } from './add-category.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoryService } from '../../data-access/services/category.service';
import { MockCategoryService } from 'src/app/mocking/category-service-mock';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, Routes, RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryListComponent } from '../category-list/category-list.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AddCategoryComponent', () => {
  let component: AddCategoryComponent;
  let fixture: ComponentFixture<AddCategoryComponent>;
  let categoryService: CategoryService;
  let router: Router;
  let location: Location;
  let debugElement: DebugElement;
  let addCategoryForm: HTMLElement;
  let submitButton: HTMLButtonElement;

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
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
      ],
      declarations: [AddCategoryComponent],
      providers: [{ provide: CategoryService, useClass: MockCategoryService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCategoryComponent);
    component = fixture.componentInstance;

    categoryService = TestBed.inject(CategoryService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    debugElement = fixture.debugElement;
    addCategoryForm = debugElement.query(By.css('form')).nativeElement;
    submitButton = addCategoryForm.querySelector('button')!;

    router.initialNavigation();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //DOM interactions : HTML template unit tests
  it('should display add category heading on render', () => {
    const h1De: DebugElement = debugElement.query(By.css('h1'));
    const h1: HTMLElement = h1De.nativeElement;

    //h1 element should render the heading
    expect(h1.textContent).toEqual('Add Category');
  });

  it('should not submit form when required fields are empty', fakeAsync(() => {
    component.addCategoryForm.controls.name.setValue('');
    component.addCategoryForm.controls.urlHandle.setValue('');

    submitButton.click();

    fixture.detectChanges();

    expect(component.addCategoryForm.valid).toBeFalsy();
  }));

  it('should submit form when requried fields are not empty and redirect to the category list component', fakeAsync(() => {
    component.addCategoryForm.controls.name.setValue('HTML');
    component.addCategoryForm.controls.urlHandle.setValue('html-blogs');

    expect(component.addCategoryForm.valid).toBeTruthy();

    submitButton.click();

    fixture.detectChanges();

    tick();

    expect(location.path()).toBe(`/admin/categories`);
  }));
});
