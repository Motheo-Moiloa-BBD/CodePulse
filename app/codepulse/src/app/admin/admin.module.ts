import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { CategoryListComponent } from './features/category-list/category-list.component';
import { AddCategoryComponent } from './features/add-category/add-category.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [CategoryListComponent, AddCategoryComponent],
  imports: [CommonModule, AdminRoutingModule, FormsModule],
})
export class AdminModule {}
