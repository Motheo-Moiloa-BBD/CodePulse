import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './features/home/home.component';
import { BlogDetailsComponent } from './features/blog-details/blog-details.component';

@NgModule({
  declarations: [HomeComponent, BlogDetailsComponent],
  imports: [CommonModule, HomeRoutingModule],
})
export class HomeModule {}
