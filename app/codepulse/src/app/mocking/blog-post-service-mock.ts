import { Observable, of } from 'rxjs';
import { BlogPost } from '../admin/data-access/models/blog-post.model';
import { mockBlogPosts } from './mock-blog-posts';

export class MockBlogPostService {
  getAllBlogPosts(): Observable<BlogPost[]> {
    return of(mockBlogPosts);
  }
}
