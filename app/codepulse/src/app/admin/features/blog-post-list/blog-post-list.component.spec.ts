import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { BlogPostListComponent } from './blog-post-list.component';
import { AddBlogPostComponent } from '../add-blog-post/add-blog-post.component';
import { EditBlogPostComponent } from '../edit-blog-post/edit-blog-post.component';
import { Router, Routes, RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BlogPostService } from '../../data-access/services/blog-post.service';
import { MockBlogPostService } from 'src/app/mocking/blog-post-service-mock';
import { Location } from '@angular/common';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { throwError } from 'rxjs';
import { mockBlogPosts } from 'src/app/mocking/mock-blog-posts';

describe('BlogPostListComponent', () => {
  let component: BlogPostListComponent;
  let fixture: ComponentFixture<BlogPostListComponent>;
  let blogpostService: BlogPostService;
  let router: Router;
  let location: Location;

  beforeEach(waitForAsync(() => {
    const routes: Routes = [
      {
        path: 'admin/blogposts/add',
        component: AddBlogPostComponent,
      },
      {
        path: 'admin/blogposts/:id',
        component: EditBlogPostComponent,
      },
    ];

    TestBed.configureTestingModule({
      declarations: [BlogPostListComponent],
      imports: [HttpClientTestingModule, RouterModule.forRoot(routes)],
      providers: [{ provide: BlogPostService, useClass: MockBlogPostService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostListComponent);
    component = fixture.componentInstance;

    blogpostService = TestBed.inject(BlogPostService);
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //Class testing
  it('should get all blogposts', () => {
    blogpostService.getAllBlogPosts().subscribe({
      next: (blogposts) => {
        expect(blogposts.length).toEqual(2);
      },
    });
  });

  //DOM interaction testing
  it('should display blogpost list heading on render', () => {
    const headingDe: DebugElement = fixture.debugElement;
    const h1De = headingDe.query(By.css('h1'));
    const h1: HTMLElement = h1De.nativeElement;

    //h1 element should render the heading
    expect(h1.textContent).toEqual('BlogPost List');
  });

  it('should navigate to add blogpost page when add blogpost anchor element is clicked', fakeAsync(() => {
    const addCategoryAnchor: HTMLElement[] =
      fixture.debugElement.nativeElement.querySelectorAll('a');

    addCategoryAnchor[0].click();

    tick();

    fixture.detectChanges();

    expect(location.path()).toBe('/admin/blogposts/add');
  }));

  it('should not render a table of blogposts when blogposts$ has an error', () => {
    component.blogPosts$ = throwError(() => new Error('Error occurred'));

    fixture.detectChanges();

    const tableElement = fixture.debugElement.query(By.css('table'));
    expect(tableElement).toBeFalsy();
  });

  it('should render a table with the correct blogposts', () => {
    const tableRows = fixture.debugElement.queryAll(By.css('tbody tr'));

    expect(tableRows.length).toEqual(2);

    //check category data in the table
    expect(tableRows[0].nativeElement.textContent).toContain(
      `${mockBlogPosts[0].title}`
    );
    expect(tableRows[1].nativeElement.textContent).toContain(
      `${mockBlogPosts[1].title}`
    );
  });

  it('should navigate to edit blogpost page when edit blogpost anchor element is clicked', fakeAsync(() => {
    const editCategoryAnchor: HTMLElement[] =
      fixture.debugElement.nativeElement.querySelectorAll('a');

    editCategoryAnchor[1].click();

    tick();

    fixture.detectChanges();

    expect(location.path()).toBe(`/admin/blogposts/${mockBlogPosts[0].id}`);
  }));
});
