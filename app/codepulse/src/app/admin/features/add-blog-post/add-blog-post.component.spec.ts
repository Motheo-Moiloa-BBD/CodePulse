import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AddBlogPostComponent } from './add-blog-post.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CategoryService } from '../../data-access/services/category.service';
import { BlogPostService } from '../../data-access/services/blog-post.service';
import { MockCategoryService } from 'src/app/mocking/category-service-mock';
import { MockBlogPostService } from 'src/app/mocking/blog-post-service-mock';
import { MarkdownComponent, MarkdownModule } from 'ngx-markdown';
import { ImageService } from 'src/app/shared/data-access/services/image.service';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BlogPostListComponent } from '../blog-post-list/blog-post-list.component';
import { ImageSelectorComponent } from 'src/app/shared/features/image-selector/image-selector.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MockImageService } from 'src/app/mocking/image-service-mock';

describe('AddBlogPostComponent', () => {
  let component: AddBlogPostComponent;
  let fixture: ComponentFixture<AddBlogPostComponent>;

  let categoryService: CategoryService;
  let blogpostService: BlogPostService;
  let imageService: ImageService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    const routes: Routes = [
      {
        path: 'admin/blogposts',
        component: BlogPostListComponent,
      },
    ];

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        MarkdownModule.forRoot(),
        SharedModule,
        ReactiveFormsModule,
      ],
      declarations: [AddBlogPostComponent],
      providers: [
        { provide: CategoryService, useClass: MockCategoryService },
        { provide: BlogPostService, useClass: MockBlogPostService },
        { provice: ImageService, useClass: MockImageService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBlogPostComponent);
    component = fixture.componentInstance;

    categoryService = TestBed.inject(CategoryService);
    blogpostService = TestBed.inject(BlogPostService);
    imageService = TestBed.inject(ImageService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //TODO: Class testing and DOM interaction testing for this component
});
