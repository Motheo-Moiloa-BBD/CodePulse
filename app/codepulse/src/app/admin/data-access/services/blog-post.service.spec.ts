import { TestBed } from '@angular/core/testing';

import { BlogPostService } from './blog-post.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import {
  mockBlogPosts,
  mockUpdatedBlogPosts,
} from 'src/app/mocking/mock-blog-posts';
import { AppConfigService } from 'src/app/app-config.service';
import { MockAppConfigService } from 'src/app/mocking/app-config-mock';
import { AddBlogpost } from '../models/add-blogpost.model';
import { UpdateBlogPost } from '../models/update-blog-post.model';
import { mockCategories } from 'src/app/mocking/mock-categories';

describe('BlogPostService', () => {
  let service: BlogPostService;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        BlogPostService,
        { provide: AppConfigService, useClass: MockAppConfigService },
      ],
    }).compileComponents();

    service = TestBed.inject(BlogPostService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('it should get a blog-post by id', () => {
    const mockBlogPostId = mockBlogPosts[0].id;
    service.getBlogPostById(mockBlogPostId).subscribe({
      next: (blogPost) => {
        expect(blogPost).toEqual(mockBlogPosts[0]);
      },
    });

    const mockRequest = httpTestingController.expectOne(
      `https://localhost:7097/api/blogposts/${mockBlogPostId}`
    );

    expect(mockRequest.request.method).toEqual('GET');

    mockRequest.flush(mockBlogPosts[0]);
  });

  it('should handle server error when fetching a blog-post by id', () => {
    const mockBlogPostId = mockBlogPosts[1].id;

    service.getBlogPostById(mockBlogPostId).subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.status).toEqual(500);
        expect(error.statusText).toMatch('Internal Server Error');
      },
    });

    const mockRequest = httpTestingController.expectOne(
      `https://localhost:7097/api/blogposts/${mockBlogPostId}`
    );

    expect(mockRequest.request.method).toEqual('GET');

    mockRequest.flush('Error occured', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });

  it('it should get a blog-post by its url handle', () => {
    const mockUrlHandle = 'testing-blogpost';
    service.getBlogPostByUrl(mockUrlHandle).subscribe({
      next: (blogPost) => {
        expect(blogPost).toEqual(mockBlogPosts[0]);
      },
    });

    const mockRequest = httpTestingController.expectOne(
      `https://localhost:7097/api/blogposts/${mockUrlHandle}`
    );

    expect(mockRequest.request.method).toEqual('GET');

    mockRequest.flush(mockBlogPosts[0]);
  });

  it('it should get a list of blogposts', () => {
    service.getAllBlogPosts().subscribe({
      next: (blogPosts) => {
        expect(blogPosts.length).toEqual(mockBlogPosts.length);
      },
    });

    const mockRequest = httpTestingController.expectOne(
      `https://localhost:7097/api/blogposts`
    );

    expect(mockRequest.request.method).toEqual('GET');

    mockRequest.flush(mockBlogPosts);
  });

  it('it should create a blogpost', () => {
    const mockAddBlogPost: AddBlogpost = {
      title: 'testing blogpost',
      urlHandle: 'testing-blogpost',
      content: 'testing',
      shortDescription: 'testing',
      featuredImageUrl: 'testing-blog-post',
      author: 'tester',
      publishedDate: new Date(),
      isVisible: true,
      categories: ['F02BB5B2-1BB3-44F6-7267-08DB615CCDFC'],
    };

    service.createBlogPost(mockAddBlogPost).subscribe({
      next: (createdBlogPost) => {
        expect(createdBlogPost).toEqual(mockBlogPosts[0]);
      },
    });

    const mockRequest = httpTestingController.expectOne(
      `https://localhost:7097/api/blogposts?addAuth=true`
    );

    expect(mockRequest.request.method).toEqual('POST');

    mockRequest.flush(mockBlogPosts[0]);
  });

  it('should update blog post by id', () => {
    const mockBlopPostId = mockBlogPosts[1].id;
    const mockUpdatedBlogPost: UpdateBlogPost = {
      title: 'testing-blogpost-updated',
      urlHandle: 'testing-blogpost-updated',
      content: 'testing-updated',
      shortDescription: 'testing-updated',
      featuredImageUrl: 'testing-blog-post-updated',
      author: 'tester-updated',
      publishedDate: new Date(),
      isVisible: true,
      categories: [mockCategories[0], mockCategories[1]],
    };

    service.updateBlogPostById(mockBlopPostId, mockUpdatedBlogPost).subscribe({
      next: (updatedBlogPost) => {
        expect(updatedBlogPost).toEqual(mockUpdatedBlogPosts[1]);
      },
    });

    const mockRequest = httpTestingController.expectOne(
      `https://localhost:7097/api/blogposts/${mockBlopPostId}?addAuth=true`
    );

    expect(mockRequest.request.method).toEqual('PUT');

    mockRequest.flush(mockUpdatedBlogPosts[1]);
  });

  afterEach(() => {
    //assert that there are no outstanding requests
    httpTestingController.verify();
  });
});
