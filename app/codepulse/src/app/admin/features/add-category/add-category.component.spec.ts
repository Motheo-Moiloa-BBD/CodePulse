import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddCategoryComponent } from './add-category.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoryService } from '../../data-access/services/category.service';
import { MockCategoryService } from 'src/app/mocking/category-service-mock';
import { ReactiveFormsModule } from '@angular/forms';
import { Router, Routes } from '@angular/router';
import { Location } from '@angular/common';
import { CategoryListComponent } from '../category-list/category-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('AddCategoryComponent', () => {
  let component: AddCategoryComponent;
  let fixture: ComponentFixture<AddCategoryComponent>;
  let categoryService: CategoryService;
  let router: Router;
  let location: Location;
  let debugElement: DebugElement;

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
        RouterTestingModule.withRoutes(routes),
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

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Class Testing

  //DOM interactions : HTML template unit tests
  it('should display category list heading on render', () => {
    const h1De = debugElement.query(By.css('h1'));
    const h1: HTMLElement = h1De.nativeElement;

    //h1 element should render the heading
    expect(h1.textContent).toEqual('Add Category');
  });
});
