import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';

import { ImageSelectorComponent } from './image-selector.component';
import { ImageService } from '../../data-access/services/image.service';
import { MockImageService } from 'src/app/mocking/image-service-mock';
import { FormsModule, NgForm } from '@angular/forms';
import { mockImages } from 'src/app/mocking/mock-images';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

describe('ImageSelectorComponent', () => {
  let component: ImageSelectorComponent;
  let fixture: ComponentFixture<ImageSelectorComponent>;
  let imageService: ImageService;
  let debugElement: DebugElement;
  let mockForm: NgForm;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ImageSelectorComponent],
      providers: [
        { provide: ImageService, useClass: MockImageService },
        {
          provide: NgForm,
          useValue: { resetForm: jasmine.createSpy('resetForm') },
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageSelectorComponent);
    component = fixture.componentInstance;

    imageService = TestBed.inject(ImageService);
    mockForm = TestBed.inject(NgForm);
    debugElement = fixture.debugElement;

    //ngOnit()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should upload image', () => {
    const mockFile = new File([''], 'test.jpg', { type: 'image/jpeg' });
    component.fileName = 'test-file';
    component.title = 'test-title';
    component['file'] = mockFile;

    component.uploadImage();

    expect(mockForm.resetForm).toHaveBeenCalled();
  });
});
