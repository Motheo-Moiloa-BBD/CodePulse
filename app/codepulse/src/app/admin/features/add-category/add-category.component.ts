import { Component, OnDestroy } from '@angular/core';
import { AddCategoryRequest } from '../../data-access/models/add-category-request.model';
import { CategoryService } from '../../data-access/services/category.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnDestroy {
  addCategoryRequest: AddCategoryRequest;
  private addCategorySubscription?: Subscription;

  constructor(private categoryService: CategoryService) {
    this.addCategoryRequest = {
      name: '',
      urlHandle: '',
    };
  }

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
