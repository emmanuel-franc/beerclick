import { NgModule, InjectionToken } from '@angular/core';
import { environment } from '../../environments/environment';

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export class AppConfig {
  maxTime: number;
  minTime: number;
  paths: {
    img: string;
    perksImg: string;
    upgradesImg: string;
  };
  beers: string;
  brewery: string;
  breweries: string;
  farm: string;
  farms: string;
}

export const APP_DI_CONFIG: AppConfig = (() => {
  const imgPath = '/assets/images/';
  return {
    maxTime: environment.maxTime || 900000,
    minTime: environment.minTime || 600000,
    paths: {
      img: imgPath,
      perksImg: imgPath + 'perks/',
      upgradesImg: imgPath + 'upgrades/'
    },
    beers: 'Beers',
    brewery: 'Brewery',
    breweries: 'Breweries',
    farm: 'Farm',
    farms: 'Farms'
  };
})();

@NgModule({
  providers: [{
    provide: APP_CONFIG,
    useValue: APP_DI_CONFIG
  }]
})
export class AppConfigModule { }
