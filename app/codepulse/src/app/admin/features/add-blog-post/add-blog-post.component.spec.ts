import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';

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
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';

describe('AddBlogPostComponent', () => {
  let component: AddBlogPostComponent;
  let fixture: ComponentFixture<AddBlogPostComponent>;

  let categoryService: CategoryService;
  let blogpostService: BlogPostService;
  let imageService: ImageService;
  let router: Router;
  let location: Location;
  let debugElement: DebugElement;
  let addBlogPostForm: HTMLElement;
  let submitButton: HTMLButtonElement;

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

    debugElement = fixture.debugElement;
    addBlogPostForm = debugElement.query(By.css('form')).nativeElement;

    submitButton = addBlogPostForm.querySelector('.submit')!;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Class and DOM interaction testing

  //DOM interactions : HTML template unit tests
  it('should display add blogpost heading on render', () => {
    const h1De: DebugElement = debugElement.query(By.css('h1'));
    const h1: HTMLElement = h1De.nativeElement;

    //h1 element should render the heading
    expect(h1.textContent).toEqual('Add BlogPost');
  });

  it('should open image selector component', fakeAsync(() => {
    const openButton: HTMLButtonElement = debugElement.query(
      By.css('.open')
    ).nativeElement;

    openButton.click();

    fixture.detectChanges();

    tick();

    expect(component.isImageSelectorVisible).toBeTrue();
  }));

  it('image selector should not be visible by default', () => {
    expect(component.isImageSelectorVisible).toBeFalse();
  });

  it('should not submit form when required fields are empty', fakeAsync(() => {
    component.addBlogPostForm.controls.title.setValue('');
    component.addBlogPostForm.controls.urlHandle.setValue('');
    component.addBlogPostForm.controls.categories.setValue(['']);

    submitButton.click();

    fixture.detectChanges();

    expect(component.addBlogPostForm.valid).toBeFalsy();
  }));

  it('should submit form when requried fields are not empty and redirect to the category list component', fakeAsync(() => {
    component.addBlogPostForm.controls.title.setValue('testing blogpost');
    component.addBlogPostForm.controls.urlHandle.setValue('testing-blogpost');
    component.addBlogPostForm.controls.categories.setValue([
      'F02BB5B2-1BB3-44F6-7267-08DB615CCDGG',
    ]);

    expect(component.addBlogPostForm.valid).toBeTruthy();

    submitButton.click();

    fixture.detectChanges();

    tick();

    expect(location.path()).toBe(`/admin/blogposts`);
  }));
});
