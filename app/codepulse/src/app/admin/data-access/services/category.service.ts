import { Injectable } from '@angular/core';
import { AddCategoryRequest } from '../models/add-category-request.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category.model';
import { AppConfigService } from 'src/app/app-config.service';

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
}
