import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './features/home/home.component';
import { BlogDetailsComponent } from './features/blog-details/blog-details.component';
import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [HomeComponent, BlogDetailsComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MarkdownModule.forRoot(),
    SharedModule,
  ],
})
export class HomeModule {}
