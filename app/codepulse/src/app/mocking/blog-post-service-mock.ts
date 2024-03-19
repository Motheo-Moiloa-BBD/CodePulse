import { Observable, of } from 'rxjs';
import { BlogPost } from '../admin/data-access/models/blog-post.model';
import { mockBlogPosts } from './mock-blog-posts';
import { AddBlogpost } from '../admin/data-access/models/add-blogpost.model';

export class MockBlogPostService {
  getAllBlogPosts(): Observable<BlogPost[]> {
    return of(mockBlogPosts);
  }

  createBlogPost(addBlogPost: AddBlogpost): Observable<BlogPost> {
    return of(mockBlogPosts[0]);
  }

  getBlogPostById(id: string): Observable<BlogPost> {
    return of(mockBlogPosts[1]);
  }
}
