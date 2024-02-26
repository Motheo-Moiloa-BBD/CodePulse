import { Category } from './category.model';

export interface UpdateBlogPost {
  title: string;
  urlHandle: string;
  shortDescription: string;
  content: string;
  featuredImageUrl: string;
  author: string;
  publishedDate: Date;
  isVisible: boolean;
  categories: Category[];
}
