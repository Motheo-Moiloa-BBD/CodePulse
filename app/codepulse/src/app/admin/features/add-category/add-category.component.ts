import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../../data-access/models/add-category-request.model';
import { CategoryService } from '../../data-access/services/category.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnDestroy {
  addCategoryRequest: AddCategoryRequest;
  private addCategorySubscription?: Subscription;

  addCategoryForm = new FormGroup({
    name: new FormControl('', { validators: [Validators.required] }),
    urlHandle: new FormControl('', { validators: [Validators.required] }),
  });

  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.addCategoryRequest = {
      name: '',
      urlHandle: '',
    };
  }

  //Reactive forms
  onSubmit() {
    const addCategoryRequest: AddCategoryRequest = {
      name: this.addCategoryForm.value.name,
      urlHandle: this.addCategoryForm.value.urlHandle,
    };

    this.addCategorySubscription = this.categoryService
      .addCategory(addCategoryRequest)
      .subscribe({
        next: (response) => {
          this.router.navigateByUrl('/admin/categories');
        },
      });
  }

  //Template driven formsw
  onFormSubmit() {
    this.addCategorySubscription = this.categoryService
      .addCategory(this.addCategoryRequest)
      .subscribe({
        next: (response) => {
          console.log('This was successful!');
        },
      });
  }

  ngOnDestroy(): void {
    this.addCategorySubscription?.unsubscribe();
  }
}