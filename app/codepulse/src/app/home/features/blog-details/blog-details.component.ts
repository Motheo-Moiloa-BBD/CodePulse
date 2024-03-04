import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogPost } from 'src/app/admin/data-access/models/blog-post.model';
import { BlogPostService } from 'src/app/admin/data-access/services/blog-post.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  url: string | null = null;
  blogpost$?: Observable<BlogPost>;

  constructor(
    private route: ActivatedRoute,
    private blogpostService: BlogPostService
  ) {}

  ngOnInit(): void {
    this.url = this.route.snapshot.params['url'];

    //fetch blog details by url
    if (this.url) {
      this.blogpost$ = this.blogpostService.getBlogPostByUrl(this.url);
    }
  }
}
