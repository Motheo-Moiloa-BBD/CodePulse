import { Injectable } from '@angular/core';
import { AddBlogpost } from '../models/add-blogpost.model';
import { Observable } from 'rxjs';
import { BlogPost } from '../models/blog-post.model';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/app-config.service';
import { UpdateBlogPost } from '../models/update-blog-post.model';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  constructor(private http: HttpClient, private appConfig: AppConfigService) {}

  createBlogPost(addBlogPost: AddBlogpost): Observable<BlogPost> {
    return this.http.post<BlogPost>(
      `${this.appConfig.config?.apibaseURL}/api/blogposts`,
      addBlogPost
    );
  }

  getAllBlogPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(
      `${this.appConfig.config?.apibaseURL}/api/blogposts`
    );
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return this.http.get<BlogPost>(
      `${this.appConfig.config?.apibaseURL}/api/blogposts/${id}`
    );
  }

  updateBlogPostById(
    id: string,
    updatedBlogPost: UpdateBlogPost
  ): Observable<BlogPost> {
    return this.http.put<BlogPost>(
      `${this.appConfig.config?.apibaseURL}/api/blogposts/${id}`,
      updatedBlogPost
    );
  }
}
