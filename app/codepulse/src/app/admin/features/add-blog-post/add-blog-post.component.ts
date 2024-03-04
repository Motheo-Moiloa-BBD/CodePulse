import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BlogPostService } from '../../data-access/services/blog-post.service';
import { AddBlogpost } from '../../data-access/models/add-blogpost.model';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoryService } from '../../data-access/services/category.service';
import { Category } from '../../data-access/models/category.model';
import { ImageService } from 'src/app/shared/data-access/services/image.service';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.component.html',
  styleUrls: ['./add-blog-post.component.css'],
})
export class AddBlogPostComponent implements OnInit, OnDestroy {
  private imageSelectorSubscription?: Subscription;
  categories$?: Observable<Category[]>;
  isImageSelectorVisible: boolean = false;

  addBlogPostForm = new FormGroup({
    title: new FormControl(''),
    urlHandle: new FormControl(''),
    shortDescription: new FormControl(''),
    content: new FormControl(''),
    featuredImageUrl: new FormControl(''),
    publishedDate: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en')),
    author: new FormControl(''),
    isVisible: new FormControl(true),
    categories: new FormControl(),
  });

  constructor(
    private blogPostService: BlogPostService,
    private router: Router,
    private categoryService: CategoryService,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
    this.imageSelectorSubscription = this.imageService
      .onSelectImage()
      .subscribe({
        next: (selectedImage) => {
          this.addBlogPostForm.patchValue({
            featuredImageUrl: selectedImage.url,
          });
          this.closeImageSelector();
        },
      });
  }

  onFormSubmit() {
    const addBlogPostRequest: AddBlogpost = {
      title: this.addBlogPostForm.value.title!,
      urlHandle: this.addBlogPostForm.value.urlHandle!,
      shortDescription: this.addBlogPostForm.value.shortDescription!,
      content: this.addBlogPostForm.value.content!,
      featuredImageUrl: this.addBlogPostForm.value.featuredImageUrl!,
      publishedDate: new Date(this.addBlogPostForm.value.publishedDate!),
      author: this.addBlogPostForm.value.author!,
      isVisible: this.addBlogPostForm.value.isVisible!,
      categories: this.addBlogPostForm.value.categories,
    };

    this.blogPostService.createBlogPost(addBlogPostRequest).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      },
    });
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.imageSelectorSubscription?.unsubscribe();
  }
}
