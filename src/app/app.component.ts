import {Component, OnInit, Inject} from '@angular/core';

import { APP_CONFIG, AppConfig } from './app-config/app-config.module';

import {Brewery, Farm, Beers, Upgrade, PerkSlot, Perk, Player} from './models';
import {PlayerService} from './services/player/player.service';
import {BreweryService} from './services/brewery/brewery.service';
import {FarmService} from './services/farm/farm.service';

const data = require('../assets/data/data.json');
const perksList = require('../assets/data/perks.json');
// http://stackoverflow.com/questions/34907682/how-to-display-app-version-in-angular2/35494456
const {version: appVersion} = require('../../package.json');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  player: Player;
  appVersion;
  standBy: boolean;

  constructor(public PlayerService: PlayerService,
              public BreweryService: BreweryService,
              public FarmService: FarmService,
              @Inject(APP_CONFIG) private config: AppConfig) {
    this.appVersion = appVersion;
    // standBy = lock features
    this.standBy = false;
    
    let localStoragePlayer = localStorage.getItem('BeerClickPlayer');
  
    //Initialisation of datas
    let breweries: Brewery[] = data.breweries;
    let totalBreweries: number = data.player.totalBreweries;
    let totalBreweriesAllTime: number = data.player.totalBreweriesAllTime;

    let farms: Farm[] = data.farms;
    let totalFarms: number = data.player.totalFarms;
    let totalFarmsAllTime: number = data.player.totalFarmsAllTime;

    let beers: Beers = data.player.resources.beers;
    let totalBeersAllTime: number = data.player.totalBeersAllTime;
  
    let perks: Perk[] = perksList.perks;
    let perkSlots: PerkSlot[] = data.perkSlot;

    let upgrades: Upgrade[] = data.upgrades;

    //Initialisation of object player
    if(!!localStoragePlayer) {
      this.player = JSON.parse(localStoragePlayer);
    } else {
      this.player = new Player(beers, totalBeersAllTime, perkSlots,
        perks, farms, totalFarms,
        totalFarmsAllTime, breweries, totalBreweries,
        totalBreweriesAllTime, upgrades);
    }

    this.PlayerService.playerOnChange.subscribe(data => {
      this.player = data;
      localStorage.setItem('BeerClickPlayer', JSON.stringify(data));
    });
    
    setInterval(() => {
      this.BreweryService.createBeersIncome(this.player);

      this.FarmService.createCerealsIncome(this.player);
  
      localStorage.setItem('BeerClickPlayer', JSON.stringify(this.player));
    }, 1000);
  }

  ngOnInit() {
    // check date to launch Seasonal Events
    let actualDate = new Date();

    // if it's <seasonal event> unlock upgrades
    if (this.standBy &&
      actualDate.getMonth() >= 0 &&
      actualDate.getDate() >= 15) { // TODO: set a limit in time of Seasonal Events
      let unlockChristmasEventUpgrades = this.player.resources.upgrades.filter(function(upgrade) {
        return upgrade.seasonalEvent === 'Christmas';
      });

      unlockChristmasEventUpgrades.forEach((upgrade) => {
        upgrade.unlocked = true;
      });
    }
  }
}
