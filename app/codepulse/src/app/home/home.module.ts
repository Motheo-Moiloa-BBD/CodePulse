import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { CategoryListComponent } from './features/category-list/category-list.component';
import { HomeComponent } from './features/home/home.component';

@NgModule({
  declarations: [CategoryListComponent, HomeComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
