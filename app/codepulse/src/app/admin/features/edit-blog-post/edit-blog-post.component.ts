import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { BlogPostService } from '../../data-access/services/blog-post.service';
import { BlogPost } from '../../data-access/models/blog-post.model';
import { FormControl, FormGroup } from '@angular/forms';
import { formatDate } from '@angular/common';
import { CategoryService } from '../../data-access/services/category.service';
import { Category } from '../../data-access/models/category.model';

@Component({
  selector: 'app-edit-blog-post',
  templateUrl: './edit-blog-post.component.html',
  styleUrls: ['./edit-blog-post.component.css'],
})
export class EditBlogPostComponent implements OnInit {
  blogpost?: BlogPost;
  id: string | null = null;
  private blogpostSubscription?: Subscription;
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
    private route: ActivatedRoute
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
    console.log(this.editBlogPostForm.value);
  }
}
