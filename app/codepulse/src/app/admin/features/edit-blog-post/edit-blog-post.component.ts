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
  categories$?: Observable<Category[]>;

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
    private router: Router
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

  ngOnDestroy(): void {
    this.blogpostSubscription?.unsubscribe();
    this.updateBlogpostSubscription?.unsubscribe();
  }
}
