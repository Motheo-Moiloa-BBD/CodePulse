import { TestBed } from '@angular/core/testing';
import { ImageService } from './image.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { mockImages } from 'src/app/mocking/mock-images';
import { AppConfigService } from 'src/app/app-config.service';
import { MockAppConfigService } from 'src/app/mocking/app-config-mock';
import { BlogImage } from '../models/blog-image.model';

describe('ImageService', () => {
  let service: ImageService;
  let httpTestingController: HttpTestingController;
  let appConfigService: AppConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ImageService,
        { provide: AppConfigService, useClass: MockAppConfigService },
      ],
    });

    service = TestBed.inject(ImageService);
    httpTestingController = TestBed.inject(HttpTestingController);
    appConfigService = TestBed.inject(AppConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get the apiBaseUrl', () => {
    expect(appConfigService.config?.apibaseURL).toEqual(
      'https://localhost:7097'
    );
  });

  it('should get All images', () => {
    service.getAllImages().subscribe({
      next: (imageList) => {
        expect(imageList.length).toEqual(4);
      },
    });

    const mockRequest = httpTestingController.expectOne(
      'https://localhost:7097/api/images'
    );

    //assert that the request is a get
    expect(mockRequest.request.method).toEqual('GET');

    //respond with mock data, causing Observable to resolve
    //Subscribe callback asserts that correct data was returned
    mockRequest.flush(mockImages);
  });

  it('should upload an image', () => {
    const imageUpload = new File([''], 'test-file.jpg');
    const mockUploadedImage: BlogImage = {
      id: '1',
      fileName: 'test-file',
      title: 'test-file',
      fileExtension: 'jpg',
      url: 'https://localhost:7097/Images/test-file.jpg',
    };

    service.uploadImage(imageUpload, 'test-file', 'test-file').subscribe({
      next: (uploadedImage) => {
        expect(uploadedImage).toEqual(mockUploadedImage);
      },
    });

    const mockRequest = httpTestingController.expectOne(
      'https://localhost:7097/api/images'
    );

    //assert that the request is a get
    expect(mockRequest.request.method).toEqual('POST');

    //respond with mock data, causing Observable to resolve
    //Subscribe callback asserts that correct data was returned
    mockRequest.flush(mockUploadedImage);
  });

  afterEach(() => {
    //assert that there are no outstanding requests
    httpTestingController.verify();
  });
});
