import { Observable, of } from 'rxjs';
import { BlogImage } from '../shared/data-access/models/blog-image.model';
import { mockImages } from './mock-images';

export class MockImageService {
  onSelectImage(): Observable<BlogImage> {
    return of(mockImages[1]);
  }
}
