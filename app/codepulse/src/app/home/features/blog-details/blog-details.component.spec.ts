import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BlogDetailsComponent } from './blog-details.component';
import { BlogPostService } from 'src/app/admin/data-access/services/blog-post.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockBlogPostService } from 'src/app/mocking/blog-post-service-mock';
import { SharedModule } from 'src/app/shared/shared.module';
import { mockBlogPosts } from 'src/app/mocking/mock-blog-posts';
import { MarkdownModule } from 'ngx-markdown';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('BlogDetailsComponent', () => {
  let component: BlogDetailsComponent;
  let fixture: ComponentFixture<BlogDetailsComponent>;
  let blogpostService: BlogPostService;
  let route: ActivatedRoute;
  let debugElement: DebugElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule,
        MarkdownModule.forRoot(),
      ],
      declarations: [BlogDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { url: 'test-blogpost' },
            },
          },
        },
        {
          provide: BlogPostService,
          useClass: MockBlogPostService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogDetailsComponent);
    component = fixture.componentInstance;

    blogpostService = TestBed.inject(BlogPostService);
    route = TestBed.inject(ActivatedRoute);
    debugElement = fixture.debugElement;

    //ngOnIt
    fixture.detectChanges();
  });

  it('should create and have the correct url handle', () => {
    expect(component).toBeTruthy();
    expect(component.url).toEqual(mockBlogPosts[1].urlHandle);
  });

  it('should load the correct blogpost details when loaded', () => {
    component.blogpost$?.subscribe({
      next: (blogpost) => {
        expect(blogpost).toEqual(mockBlogPosts[1]);
      },
    });
  });

  it('should render the spinner when blogspost$ is undefined', () => {
    component.blogpost$ = undefined;
    fixture.detectChanges();
    const spinner: HTMLElement = debugElement.query(
      By.css('.loader')
    ).nativeElement;
    expect(spinner).toBeTruthy();
  });
});
