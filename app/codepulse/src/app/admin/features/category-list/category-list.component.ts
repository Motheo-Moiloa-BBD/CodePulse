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

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
  }

  onSearch(queryText: string) {
    this.categories$ = this.categoryService.getAllCategories(queryText);
  }
}
