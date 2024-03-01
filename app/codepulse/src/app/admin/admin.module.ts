import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CategoryListComponent } from './features/category-list/category-list.component';
import { AddCategoryComponent } from './features/add-category/add-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditCategoryComponent } from './features/edit-category/edit-category.component';
import { BlogPostListComponent } from './features/blog-post-list/blog-post-list.component';
import { AddBlogPostComponent } from './features/add-blog-post/add-blog-post.component';
import { MarkdownModule } from 'ngx-markdown';
import { EditBlogPostComponent } from './features/edit-blog-post/edit-blog-post.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    BlogPostListComponent,
    AddBlogPostComponent,
    EditBlogPostComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MarkdownModule.forRoot(),
    SharedModule,
  ],
})
export class AdminModule {}
