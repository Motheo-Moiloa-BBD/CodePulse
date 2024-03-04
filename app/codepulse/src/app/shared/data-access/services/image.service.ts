import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BlogImage } from '../models/blog-image.model';
import { HttpClient } from '@angular/common/http';
import { AppConfigService } from 'src/app/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  selectedImage: BehaviorSubject<BlogImage>;

  constructor(private http: HttpClient, private appConfig: AppConfigService) {
    this.selectedImage = new BehaviorSubject<BlogImage>({
      id: '',
      fileExtension: '',
      fileName: '',
      title: '',
      url: '',
    });
  }

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

  selectImage(image: BlogImage): void {
    //emmiting a value
    this.selectedImage.next(image);
  }

  onSelectImage(): Observable<BlogImage> {
    return this.selectedImage.asObservable();
  }
}
