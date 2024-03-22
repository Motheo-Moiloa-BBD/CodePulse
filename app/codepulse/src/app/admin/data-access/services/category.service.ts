import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Category } from '../models/category.model';
import { AppConfigService } from 'src/app/app-config.service';
import { UpdateCategory } from '../models/update-category.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient, private appConfig: AppConfigService) {}

  addCategory(addCategoryRequest: AddCategoryRequest): Observable<Category> {
    return this.http.post<Category>(
      `${this.appConfig.config?.apibaseURL}/api/categories?addAuth=true`,
      addCategoryRequest
    );
  }

  getAllCategories(query?: string): Observable<Category[]> {
    let params = new HttpParams();

    if (query) {
      params = params.set('query', query);
    }

    return this.http.get<Category[]>(
      `${this.appConfig.config?.apibaseURL}/api/categories`,
      {
        params: params,
      }
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
      `${this.appConfig.config?.apibaseURL}/api/categories/${id}?addAuth=true`,
      updateCategoryRequest
    );
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http.delete<Category>(
      `${this.appConfig.config?.apibaseURL}/api/categories/${id}?addAuth=true`
    );
  }
}
