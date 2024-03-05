import { AppConfig } from '../shared/data-access/models/app-config.model';

export class MockAppConfigService {
  private appConfig: AppConfig = {
    apibaseURL: 'https://localhost:7097',
  };

  async loadAppConfig(): Promise<AppConfig> {
    return this.appConfig;
  }

  get config(): AppConfig {
    return this.appConfig;
  }
}
