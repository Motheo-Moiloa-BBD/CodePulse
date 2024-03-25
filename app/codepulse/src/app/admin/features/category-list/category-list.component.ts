import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../data-access/services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../data-access/models/category.model';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
})
export class CategoryListComponent implements OnInit {
  categories$?: Observable<Category[]>;
  totalCount?: number;
  list: number[] = [];
  pageNumber: number = 1;
  pageSize: number = 3;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategoryCount().subscribe({
      next: (count) => {
        this.totalCount = count;
        this.list = new Array(Math.ceil(count / this.pageSize));
        this.categories$ = this.categoryService.getAllCategories(
          undefined,
          undefined,
          undefined,
          this.pageNumber,
          this.pageSize
        );
      },
    });
  }

  onSearch(queryText: string) {
    this.categories$ = this.categoryService.getAllCategories(queryText);
  }

  sort(sortBy: string, sortOrder: string): void {
    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      sortBy,
      sortOrder
    );
  }

  getPage(pageNumber: number): void {
    this.pageNumber = pageNumber;

    this.categories$ = this.categoryService.getAllCategories(
      undefined,
      undefined,
      undefined,
      this.pageNumber,
      this.pageSize
    );
  }

  getPrevPage(): void {
    if (this.pageNumber - 1 < 1) {
      return;
    }
    this.getPage(this.pageNumber - 1);
  }

  getNextPage(): void {
    if (this.pageNumber + 1 > this.list.length) {
      return;
    }

    this.getPage(this.pageNumber + 1);
  }
}
