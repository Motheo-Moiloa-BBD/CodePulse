import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AppConfigService } from 'src/app/app-config.service';
import { MockAppConfigService } from 'src/app/mocking/app-config-mock';
import { AddCategoryRequest } from '../models/add-category-request.model';
import {
  mockCategories,
  mockUpdatedCategories,
} from 'src/app/mocking/mock-categories';
import { UpdateCategory } from '../models/update-category.model';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CategoryService,
        { provide: AppConfigService, useClass: MockAppConfigService },
      ],
    }).compileComponents();

    service = TestBed.inject(CategoryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    //assert that there are no outstanding requests
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a category', () => {
    const mockAddCategory: AddCategoryRequest = {
      name: 'HTML',
      urlHandle: 'html-blogs',
    };

    service.addCategory(mockAddCategory).subscribe({
      next: (category) => {
        expect(category).toEqual(mockCategories[0]);
      },
    });

    const mockRequest = httpMock.expectOne(
      `https://localhost:7097/api/categories?addAuth=true`
    );

    expect(mockRequest.request.method).toEqual('POST');

    mockRequest.flush(mockCategories[0]);
  });

  it('should update a category by its id', () => {
    const mockCategoryId = mockCategories[0].id;
    const mockUpdateCategory: UpdateCategory = {
      name: 'ASP.NET-Core-updated',
      urlHandle: 'aspnet-blogs-updated',
    };

    service.updateCategory(mockCategoryId, mockUpdateCategory).subscribe({
      next: (updatedCategory) => {
        expect(updatedCategory).toEqual(mockUpdatedCategories[1]);
      },
    });

    const mockRequest = httpMock.expectOne(
      `https://localhost:7097/api/categories/${mockCategoryId}?addAuth=true`
    );

    expect(mockRequest.request.method).toEqual('PUT');

    mockRequest.flush(mockUpdatedCategories[1]);
  });

  it('should delete a category by id', () => {
    const mockCategoryId = mockCategories[2].id;
    service.deleteCategory(mockCategoryId).subscribe({
      next: (deletedCategory) => {
        expect(deletedCategory).toEqual(mockCategories[2]);
      },
    });

    const mockRequest = httpMock.expectOne(
      `https://localhost:7097/api/categories/${mockCategoryId}?addAuth=true`
    );

    expect(mockRequest.request.method).toEqual('DELETE');

    mockRequest.flush(mockCategories[2]);
  });

  it('should get a list of categories', () => {
    service.getAllCategories().subscribe({
      next: (categories) => {
        expect(categories.length).toEqual(mockCategories.length);
      },
    });

    const mockRequest = httpMock.expectOne(
      `https://localhost:7097/api/categories`
    );

    expect(mockRequest.request.method).toEqual('GET');

    mockRequest.flush(mockCategories);
  });

  it('should get a category by id', () => {
    const mockCategoryId = mockCategories[1].id;
    service.getCategoryById(mockCategoryId).subscribe({
      next: (category) => {
        expect(category).toEqual(mockCategories[1]);
      },
    });

    const mockRequest = httpMock.expectOne(
      `https://localhost:7097/api/categories/${mockCategoryId}`
    );

    expect(mockRequest.request.method).toEqual('GET');

    mockRequest.flush(mockCategories[1]);
  });
});
