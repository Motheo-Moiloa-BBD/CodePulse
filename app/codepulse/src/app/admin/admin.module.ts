import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CategoryListComponent } from './features/category-list/category-list.component';
import { AddCategoryComponent } from './features/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCategoryComponent } from './features/edit-category/edit-category.component';
import { BlogPostListComponent } from './features/blog-post-list/blog-post-list.component';

@NgModule({
  declarations: [
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    BlogPostListComponent,
  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule, ReactiveFormsModule],
})
export class AdminModule {}
