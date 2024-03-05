import { TestBed } from '@angular/core/testing';

import { AppConfigService } from './app-config.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { MockAppConfigService } from './mocking/app-config-mock';
import { AppConfig } from './shared/data-access/models/app-config.model';
import { environment } from 'src/environments/environment';
import { throwError } from 'rxjs';

describe('AppConfigService', () => {
  let service: AppConfigService;
  let http: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: AppConfigService }],
    });
    service = TestBed.inject(AppConfigService);
    http = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return undefined when config is not loaded', () => {
    expect(service.config).toBeUndefined();
  });

  it('should load app config', (done: DoneFn) => {
    const mockConfig: AppConfig = { apibaseURL: 'https://localhost:7097' };

    service.loadAppConfig().then((config) => {
      expect(config).toEqual(mockConfig);
      expect(service.config).toEqual(mockConfig);
      done();
    });

    const mockRequest = httpTestingController.expectOne(environment.config);

    //assert that the request is a get
    expect(mockRequest.request.method).toBe('GET');

    //respond with mock data, causing Observable to resolve
    //Subscribe callback asserts that correct data was returned
    mockRequest.flush(mockConfig);
  });

  it('should return loaded app config', () => {
    const mockConfig: AppConfig = { apibaseURL: 'https://localhost:7097' };

    service['appConfig'] = mockConfig;

    const result = service.config;

    expect(result).toEqual(mockConfig);
  });

  it('should return handle error when loading app config', (done: DoneFn) => {
    const mockErrorResponse = {
      status: 500,
      statusText: 'Internal Server Error',
    };

    service.loadAppConfig().catch((error) => {
      expect(error).toBeTruthy();
      expect(error.status).toBe(500);
      expect(error.statusText).toBe('Internal Server Error');
      done();
    });

    const mockRequest = httpTestingController.expectOne(environment.config);
    expect(mockRequest.request.method).toBe('GET');

    mockRequest.flush(null, mockErrorResponse);
  });
});
