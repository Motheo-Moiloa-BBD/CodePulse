import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListComponent } from './features/category-list/category-list.component';
import { AddCategoryComponent } from './features/add-category/add-category.component';
import { EditCategoryComponent } from './features/edit-category/edit-category.component';
import { BlogPostListComponent } from './features/blog-post-list/blog-post-list.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoryListComponent,
  },
  {
    path: 'categories/add',
    component: AddCategoryComponent,
  },
  {
    path: 'categories/:id',
    component: EditCategoryComponent,
  },
  {
    path: 'blogposts',
    component: BlogPostListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
