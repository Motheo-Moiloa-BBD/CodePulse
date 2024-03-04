import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BlogImage } from '../models/blog-image.model';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  constructor(private http: HttpClient, private appConfig: AppConfigService) {}

  uploadImage(
    file: File,
    fileName: string,
    title: string
  ): Observable<BlogImage> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', fileName);
    formData.append('title', title);

    return this.http.post<BlogImage>(
      `${this.appConfig.config?.apibaseURL}/api/images`,
      formData
    );
  }

  getAllImages(): Observable<BlogImage[]> {
    return this.http.get<BlogImage[]>(
      `${this.appConfig.config?.apibaseURL}/api/images`
    );
  }
}
