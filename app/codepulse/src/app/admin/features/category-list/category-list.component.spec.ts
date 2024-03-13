import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListComponent } from './category-list.component';
import { CategoryService } from '../../data-access/services/category.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { mockCategories } from 'src/app/mocking/mock-categories';
import { of } from 'rxjs';
import { mockCategoryService } from 'src/app/mocking/category-service-mock';
import { RouterTestingModule } from '@angular/router/testing';

describe('CategoryListComponent', () => {
  let component: CategoryListComponent;
  let fixture: ComponentFixture<CategoryListComponent>;
  let categoryService: CategoryService;

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

  //DOM interactions testing
});
