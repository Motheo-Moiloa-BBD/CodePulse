import { Observable, of } from 'rxjs';
import { BlogPost } from '../admin/data-access/models/blog-post.model';
import { mockBlogPosts, mockUpdatedBlogPosts } from './mock-blog-posts';
import { AddBlogpost } from '../admin/data-access/models/add-blogpost.model';
import { UpdateBlogPost } from '../admin/data-access/models/update-blog-post.model';

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

  getBlogPostByUrl(url: string): Observable<BlogPost> {
    return of(mockBlogPosts[1]);
  }

  updateBlogPostById(
    id: string,
    updatedBlogpost: UpdateBlogPost
  ): Observable<BlogPost> {
    return of(mockUpdatedBlogPosts[1]);
  }

  deleteBlogPostById(id: string): Observable<BlogPost> {
    return of(mockBlogPosts[1]);
  }
}
