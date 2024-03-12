import { BlogPost } from '../admin/data-access/models/blog-post.model';
import { mockCategories } from './mock-categories';

const mockBlogPosts: BlogPost[] = [
  {
    id: 'F02BB5B2-1BB3-44F6-7267-08DB615CCDFB',
    title: 'testing blogpost',
    urlHandle: 'testing-blogpost',
    content: 'testing',
    shortDescription: 'testing',
    featuredImageUrl: 'testing-blog-post',
    author: 'tester',
    publishedDate: new Date(),
    isVisible: true,
    categories: [mockCategories[3]],
  },
  {
    id: 'F02BB5B4-2BB7-33F6-3421-08DB615CCDFB',
    title: 'test blogpost',
    urlHandle: 'test-blogpost',
    content: 'test',
    shortDescription: 'test',
    featuredImageUrl: 'test-blog-post',
    author: 'tester',
    publishedDate: new Date(),
    isVisible: true,
    categories: [mockCategories[3]],
  },
];

const mockUpdatedBlogPosts: BlogPost[] = [
  {
    id: 'F02BB5B2-1BB3-44F6-7267-08DB615CCDFB',
    title: 'test-blogpost-update',
    urlHandle: 'test-blogpost-update',
    content: 'test-update',
    shortDescription: 'tes',
    featuredImageUrl: 'test-blog-post-update',
    author: 'tester-update',
    publishedDate: new Date(),
    isVisible: false,
    categories: [],
  },
  {
    id: 'F02BB5B4-2BB7-33F6-3421-08DB615CCDFB',
    title: 'testing-blogpost-updated',
    urlHandle: 'testing-blogpost-updated',
    content: 'testing-updated',
    shortDescription: 'testing-updated',
    featuredImageUrl: 'testing-blog-post-updated',
    author: 'tester-updated',
    publishedDate: new Date(),
    isVisible: true,
    categories: [mockCategories[0], mockCategories[1]],
  },
];

export { mockBlogPosts, mockUpdatedBlogPosts };
