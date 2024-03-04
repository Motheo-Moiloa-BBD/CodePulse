import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../../data-access/services/blog-post.service';
import { BlogPost } from '../../data-access/models/blog-post.model';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { CategoryService } from '../../data-access/services/category.service';
import { Category } from '../../data-access/models/category.model';
import { UpdateBlogPost } from '../../data-access/models/update-blog-post.model';
import { ImageService } from 'src/app/shared/data-access/services/image.service';

@Component({
  selector: 'app-edit-blog-post',
  templateUrl: './edit-blog-post.component.html',
  styleUrls: ['./edit-blog-post.component.css'],
})
export class EditBlogPostComponent implements OnInit, OnDestroy {
  blogpost?: BlogPost;
  id: string | null = null;
  private blogpostSubscription?: Subscription;
  private updateBlogpostSubscription?: Subscription;
  private deleteBlogPostSubscription?: Subscription;
  private imageSelectSubscription?: Subscription;
  categories$?: Observable<Category[]>;
  isImageSelectorVisible: boolean = false;

  editBlogPostForm = new FormGroup({
    title: new FormControl(''),
    urlHandle: new FormControl(''),
    shortDescription: new FormControl(''),
    content: new FormControl(''),
    featuredImageUrl: new FormControl(''),
    publishedDate: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en')),
    author: new FormControl(''),
    isVisible: new FormControl(),
    categories: new FormControl(),
  });

  constructor(
    private blogpostService: BlogPostService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if (this.id) {
      this.blogpostSubscription = this.blogpostService
        .getBlogPostById(this.id)
        .subscribe({
          next: (response) => {
            this.blogpost = response;
            this.categories$ = this.categoryService.getAllCategories();

            this.editBlogPostForm.setValue({
              title: response.title,
              urlHandle: response.urlHandle,
              shortDescription: response.shortDescription,
              content: response.content,
              featuredImageUrl: response.featuredImageUrl,
              publishedDate: formatDate(
                response.publishedDate,
                'yyyy-MM-dd',
                'en'
              ),
              author: response.author,
              isVisible: response.isVisible,
              categories: response.categories.map((x) => x.id),
            });
          },
        });
    }

    this.imageSelectSubscription = this.imageService.onSelectImage().subscribe({
      next: (response) => {
        this.editBlogPostForm.patchValue({
          featuredImageUrl: response.url,
        });
        this.isImageSelectorVisible = false;
      },
    });
  }

  onFormSubmit() {
    const updateBlogPostRequest: UpdateBlogPost = {
      title: this.editBlogPostForm.value.title!,
      urlHandle: this.editBlogPostForm.value.urlHandle!,
      shortDescription: this.editBlogPostForm.value.shortDescription!,
      content: this.editBlogPostForm.value.content!,
      featuredImageUrl: this.editBlogPostForm.value.featuredImageUrl!,
      publishedDate: new Date(this.editBlogPostForm.value.publishedDate!),
      author: this.editBlogPostForm.value.author!,
      isVisible: this.editBlogPostForm.value.isVisible,
      categories: this.editBlogPostForm.value.categories,
    };

    if (this.id && this.editBlogPostForm.valid) {
      this.blogpostService
        .updateBlogPostById(this.id, updateBlogPostRequest)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/blogposts');
          },
        });
    }
  }

  onDelete() {
    if (this.id) {
      this.deleteBlogPostSubscription = this.blogpostService
        .deleteBlogPostById(this.id)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/admin/blogposts');
          },
        });
    }
  }

  openImageSelector(): void {
    this.isImageSelectorVisible = true;
  }

  closeImageSelector(): void {
    this.isImageSelectorVisible = false;
  }

  ngOnDestroy(): void {
    this.blogpostSubscription?.unsubscribe();
    this.updateBlogpostSubscription?.unsubscribe();
    this.deleteBlogPostSubscription?.unsubscribe();
    this.imageSelectSubscription?.unsubscribe();
  }
}
