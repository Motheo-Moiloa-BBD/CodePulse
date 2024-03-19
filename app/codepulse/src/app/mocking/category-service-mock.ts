import { Observable, of } from 'rxjs';
import { Category } from '../admin/data-access/models/category.model';
import { mockCategories, mockUpdatedCategories } from './mock-categories';
import { UpdateCategory } from '../admin/data-access/models/update-category.model';

export class MockCategoryService {
  getAllCategories(): Observable<Category[]> {
    return of(mockCategories);
  }

  addCategory(): Observable<Category> {
    return of(mockCategories[0]);
  }

  getCategoryById(id: string): Observable<Category> {
    return of(mockCategories[0]);
  }

  updateCategory(
    id: string,
    updateCategoryRequest: UpdateCategory
  ): Observable<Category> {
    return of(mockUpdatedCategories[0]);
  }

  deleteCategory(id: string): Observable<Category> {
    return of(mockCategories[0]);
  }
}
