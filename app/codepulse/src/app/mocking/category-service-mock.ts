import { Observable, of } from 'rxjs';
import { Category } from '../admin/data-access/models/category.model';
import { mockCategories } from './mock-categories';

export class mockCategoryService {
  getAllCategories(): Observable<Category[]> {
    return of(mockCategories);
  }
}
