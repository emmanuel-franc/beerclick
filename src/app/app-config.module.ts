import { NgModule, InjectionToken } from '@angular/core';
import { environment } from '../environments/environment';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig {
  apiEndpoint: string;
  maxTime: number;
  minTime: number;
}

export const APP_DI_CONFIG: AppConfig = {
  apiEndpoint: 'http://localhost:8000/api/v1',
  maxTime: environment.maxTime || 900000,
  minTime: environment.minTime || 600000,
};

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule { }
