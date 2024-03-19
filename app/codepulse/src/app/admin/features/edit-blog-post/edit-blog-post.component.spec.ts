import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditBlogPostComponent } from './edit-blog-post.component';
import { CategoryService } from '../../data-access/services/category.service';
import { BlogPostService } from '../../data-access/services/blog-post.service';
import { DebugElement } from '@angular/core';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { ImageService } from 'src/app/shared/data-access/services/image.service';
import { BlogPostListComponent } from '../blog-post-list/blog-post-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockCategoryService } from 'src/app/mocking/category-service-mock';
import { MockBlogPostService } from 'src/app/mocking/blog-post-service-mock';
import { MockImageService } from 'src/app/mocking/image-service-mock';
import { Location, formatDate } from '@angular/common';
import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { mockBlogPosts } from 'src/app/mocking/mock-blog-posts';
import { mockImages } from 'src/app/mocking/mock-images';

describe('EditBlogPostComponent', () => {
  let component: EditBlogPostComponent;
  let fixture: ComponentFixture<EditBlogPostComponent>;

  let categoryService: CategoryService;
  let blogpostService: BlogPostService;
  let imageService: ImageService;
  let router: Router;
  let route: ActivatedRoute;
  let location: Location;
  let debugElement: DebugElement;
  let editBlogPostForm: HTMLElement;
  let saveButton: HTMLButtonElement;
  let deleteButton: HTMLButtonElement;

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
      declarations: [EditBlogPostComponent],
      providers: [
        { provide: CategoryService, useClass: MockCategoryService },
        { provide: BlogPostService, useClass: MockBlogPostService },
        { provice: ImageService, useClass: MockImageService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: 'F02BB5B4-2BB7-33F6-3421-08DB615CCDFB' },
            },
          },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBlogPostComponent);
    component = fixture.componentInstance;

    categoryService = TestBed.inject(CategoryService);
    blogpostService = TestBed.inject(BlogPostService);
    imageService = TestBed.inject(ImageService);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    location = TestBed.inject(Location);

    debugElement = fixture.debugElement;

    //ngOnIt();
    fixture.detectChanges();

    editBlogPostForm = debugElement.query(By.css('form')).nativeElement;
    saveButton = editBlogPostForm.querySelector('.save')!;
    deleteButton = editBlogPostForm.querySelector('.delete')!;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Class testing

  it('should have the correct blogpost after component is loaded', () => {
    expect(component.id).toEqual(mockBlogPosts[1].id);
    expect(component.blogpost).toEqual(mockBlogPosts[1]);
  });

  it('should load correct values on the edit blogpost form', () => {
    fixture.detectChanges();
    expect(component.editBlogPostForm.controls.title.value).toEqual(
      mockBlogPosts[1].title
    );
    expect(component.editBlogPostForm.controls.urlHandle.value).toEqual(
      mockBlogPosts[1].urlHandle
    );
    expect(component.editBlogPostForm.controls.author.value).toEqual(
      mockBlogPosts[1].author
    );
    expect(component.editBlogPostForm.controls.content.value).toEqual(
      mockBlogPosts[1].content
    );
    expect(component.editBlogPostForm.controls.shortDescription.value).toEqual(
      mockBlogPosts[1].shortDescription
    );
    expect(component.editBlogPostForm.controls.isVisible.value).toEqual(
      mockBlogPosts[1].isVisible
    );

    imageService.selectImage(mockImages[3]);

    expect(component.editBlogPostForm.controls.featuredImageUrl.value).toEqual(
      mockBlogPosts[1].featuredImageUrl
    );
    expect(component.editBlogPostForm.controls.publishedDate.value).toEqual(
      formatDate(mockBlogPosts[1].publishedDate, 'yyyy-MM-dd', 'en')
    );

    expect(component.editBlogPostForm.controls.categories.value).toEqual(
      mockBlogPosts[1].categories.map((x) => x.id)
    );
  });

  //DOM interaction testing
  it('should display edit blogpost heading on render', () => {
    const h1De: DebugElement = debugElement.query(By.css('h1'));
    const h1: HTMLElement = h1De.nativeElement;

    //h1 element should render the heading
    expect(h1.textContent).toEqual('Edit BlogPost');
  });
});
