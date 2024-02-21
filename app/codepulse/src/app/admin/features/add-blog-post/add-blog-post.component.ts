import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-blog-post',
  templateUrl: './add-blog-post.component.html',
  styleUrls: ['./add-blog-post.component.css'],
})
export class AddBlogPostComponent {
  addBlogPostForm = new FormGroup({
    title: new FormControl(''),
    urlHandle: new FormControl(''),
    shortDescription: new FormControl(''),
    content: new FormControl(''),
    featuredImageUrl: new FormControl(''),
    publishedDate: new FormControl(formatDate(new Date(), 'yyyy-MM-dd', 'en')),
    author: new FormControl(''),
    isVisible: new FormControl(true),
  });

  onFormSubmit() {
    console.log(this.addBlogPostForm.value);
  }
}
