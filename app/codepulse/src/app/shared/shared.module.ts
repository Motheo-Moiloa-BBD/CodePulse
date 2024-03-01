import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './features/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ImageSelectorComponent } from './features/image-selector/image-selector.component';

@NgModule({
  declarations: [NavBarComponent, ImageSelectorComponent],
  imports: [CommonModule, RouterModule],
  exports: [ImageSelectorComponent],
})
export class SharedModule {}
