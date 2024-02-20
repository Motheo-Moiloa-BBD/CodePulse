import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Category } from '../../data-access/models/category.model';
import { CategoryService } from '../../data-access/services/category.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit, OnDestroy {
  category?: Category;
  categorySubscription?: Subscription;
  id: string | null = null;

  editCategoryForm = new FormGroup({
    id: new FormControl({ value: '', disabled: true }),
    name: new FormControl(''),
    urlHandle: new FormControl(''),
  });

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService
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
    console.log(this.editCategoryForm.value);
  }

  ngOnDestroy(): void {
    this.categorySubscription?.unsubscribe();
  }
}
