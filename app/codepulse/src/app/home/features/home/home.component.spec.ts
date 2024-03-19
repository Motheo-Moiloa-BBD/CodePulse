import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BlogPostService } from 'src/app/admin/data-access/services/blog-post.service';
import { MockBlogPostService } from 'src/app/mocking/blog-post-service-mock';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import { BlogDetailsComponent } from '../blog-details/blog-details.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { mockBlogPosts } from 'src/app/mocking/mock-blog-posts';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let blogpostService: BlogPostService;
  let debugElement: DebugElement;
  let location: Location;

  beforeEach(waitForAsync(() => {
    const routes: Routes = [
      {
        path: 'home/blog/:urlHandle',
        component: BlogDetailsComponent,
      },
    ];

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        SharedModule,
        RouterTestingModule.withRoutes(routes),
      ],
      declarations: [HomeComponent],
      providers: [{ provide: BlogPostService, useClass: MockBlogPostService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    blogpostService = TestBed.inject(BlogPostService);
    debugElement = fixture.debugElement;
    location = TestBed.inject(Location);

    //ngOnit
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    component.blogs$?.subscribe({
      next: (blogposts) => {
        expect(blogposts.length).toEqual(2);
      },
    });
  });

  it('should render the spinner when blogs$ is undefined', () => {
    component.blogs$ = undefined;
    fixture.detectChanges();
    const spinner: HTMLElement = debugElement.query(
      By.css('.loader')
    ).nativeElement;
    expect(spinner).toBeTruthy();
  });

  it('should redirect to blogpost details page when read more is clicked', fakeAsync(() => {
    const anchor: HTMLElement = debugElement.query(
      By.css('.read')
    ).nativeElement;
    anchor.click();
    fixture.detectChanges();
    tick();
    expect(location.path()).toEqual(`/home/blog/${mockBlogPosts[0].urlHandle}`);
  }));
});
