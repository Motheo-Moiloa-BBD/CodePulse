import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../data-access/models/category.model';
import { CategoryService } from '../../data-access/services/category.service';
import { FormControl, FormGroup } from '@angular/forms';
import { UpdateCategory } from '../../data-access/models/update-category.model';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  category?: Category;
  categorySubscription?: Subscription;
  editCategorySubscription?: Subscription;
  updateCategorySubscription?: Subscription;
  id: string | null = null;

  editCategoryForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    name: new FormControl(''),
    urlHandle: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.categorySubscription = this.categoryService
        .getCategoryById(this.id)
        .subscribe({
          next: (response) => {
            this.category = response;
            this.editCategoryForm.setValue({
              id: response.id,
              name: response.name,
              urlHandle: response.urlHandle,
            });
          },
        });
    }
  }

  onFormSubmit(): void {
    const updateCategoryRequest: UpdateCategory = {
      name: this.editCategoryForm.value.name as string,
      urlHandle: this.editCategoryForm.value.urlHandle as string,
    };

    if (this.id) {
      this.categorySubscription = this.categoryService
        .updateCategory(this.id, updateCategoryRequest)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/categories');
          },
        });
    }
  }

  onDelete(): void {
    if (this.id) {
      this.editCategorySubscription = this.categoryService
        .deleteCategory(this.id)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/categories');
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
    this.editCategorySubscription?.unsubscribe();
    this.updateCategorySubscription?.unsubscribe();
  }
}
