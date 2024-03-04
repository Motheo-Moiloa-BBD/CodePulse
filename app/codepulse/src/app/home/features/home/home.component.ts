import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogPost } from 'src/app/admin/data-access/models/blog-post.model';
import { BlogPostService } from 'src/app/admin/data-access/services/blog-post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  blogs$?: Observable<BlogPost[]>;

  constructor(private blogpostService: BlogPostService) {}

  ngOnInit(): void {
    this.blogs$ = this.blogpostService.getAllBlogPosts();
  }
}
