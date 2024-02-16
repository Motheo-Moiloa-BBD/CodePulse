import { Component } from '@angular/core';
import { AddCategoryRequest } from '../../data-access/models/add-category-request.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent {
  addCategoryRequest: AddCategoryRequest;

  constructor() {
    this.addCategoryRequest = {
      name: '',
      urlHandle: '',
    };
  }

  onFormSubmit() {
    console.log(this.addCategoryRequest);
  }
}
