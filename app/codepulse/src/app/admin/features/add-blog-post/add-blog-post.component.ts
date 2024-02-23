import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BlogPostService } from '../../data-access/services/blog-post.service';
import { AddBlogpost } from '../../data-access/models/add-blogpost.model';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { CategoryService } from '../../data-access/services/category.service';
import { Category } from '../../data-access/models/category.model';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.component.html',
  styleUrls: ['./add-blog-post.component.css'],
})
export class AddBlogPostComponent implements OnInit {
  categories$?: Observable<Category[]>;

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
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAllCategories();
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
      categories: this.addBlogPostForm.value.categories!,
    };

    this.blogPostService.createBlogPost(addBlogPostRequest).subscribe({
      next: (response) => {
        this.router.navigateByUrl('/admin/blogposts');
      },
    });
  }
}
