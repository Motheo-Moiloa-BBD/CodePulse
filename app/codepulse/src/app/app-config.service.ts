import { Injectable } from '@angular/core';
import { AppConfig } from './shared/data-access/models/app-config.model';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private appConfig?: AppConfig;

  constructor(private http: HttpClient) {}

  async loadAppConfig(): Promise<AppConfig> {
    const data = await lastValueFrom(
      this.http.get<AppConfig>(environment.config)
    );
    this.appConfig = data;
    return data;
  }

  get config() {
    return this.appConfig;
  }
}
