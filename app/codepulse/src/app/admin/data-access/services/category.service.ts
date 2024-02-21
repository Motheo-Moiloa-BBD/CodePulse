import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { AppConfigService } from 'src/app/app-config.service';
import { UpdateCategory } from '../models/update-category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private appConfig: AppConfigService) {}

  addCategory(addCategoryRequest: AddCategoryRequest): Observable<void> {
    return this.http.post<void>(
      `${this.appConfig.config?.apibaseURL}/api/categories`,
      addCategoryRequest
    );
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `${this.appConfig.config?.apibaseURL}/api/categories`
    );
  }

  getCategoryById(id: string): Observable<Category> {
    return this.http.get<Category>(
      `${this.appConfig.config?.apibaseURL}/api/categories/${id}`
    );
  }

  updateCategory(
    id: string,
    updateCategoryRequest: UpdateCategory
  ): Observable<Category> {
    return this.http.put<Category>(
      `${this.appConfig.config?.apibaseURL}/api/categories/${id}`,
      updateCategoryRequest
    );
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(
      `${this.appConfig.config?.apibaseURL}/api/categories/${id}`
    );
  }
}
