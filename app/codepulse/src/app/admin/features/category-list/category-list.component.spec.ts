import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListComponent } from './category-list.component';
import { CategoryService } from '../../data-access/services/category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockCategories } from 'src/app/mocking/mock-categories';
import { of } from 'rxjs';
import { mockCategoryService } from 'src/app/mocking/category-service-mock';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;
  let categoryService: CategoryService;

  //used async since compileComponents() is asynchronous
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [CategoryListComponent],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: CategoryService, useClass: mockCategoryService }],
    }).compileComponents();

    fixture = TestBed.createComponent(CategoryListComponent);
    component = fixture.componentInstance;

    categoryService = TestBed.inject(CategoryService);

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
});
