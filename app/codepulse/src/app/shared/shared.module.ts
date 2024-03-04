import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './features/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';
import { ImageSelectorComponent } from './features/image-selector/image-selector.component';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from './ui/spinner/spinner.component';

@NgModule({
  declarations: [NavBarComponent, ImageSelectorComponent, SpinnerComponent],
  imports: [CommonModule, RouterModule, FormsModule],
  exports: [ImageSelectorComponent, SpinnerComponent],
})
export class SharedModule {}
