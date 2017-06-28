import {Component, OnInit, Inject} from '@angular/core';

import { APP_CONFIG, AppConfig } from './app-config.module';

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
  beers: Beers;
  perkSlots: PerkSlot[];
  perks: Perk[];
  farms: Farm[];
  breweries: Brewery[];
  upgrades: Upgrade[];
  totalBreweries: number;
  totalFarms: number;
  totalBeersAllTime: number;
  totalBreweriesAllTime: number;
  totalFarmsAllTime: number;
  appVersion;
  standBy: boolean;

  constructor(public PlayerService: PlayerService,
              public BreweryService: BreweryService,
              public FarmService: FarmService,
              @Inject(APP_CONFIG) private config: AppConfig) {
    this.appVersion = appVersion;
    this.perkSlots = [];
    this.perks = [];
    this.farms = [];
    this.breweries = [];
    this.upgrades = [];
    this.totalBeersAllTime = 0;
    // standBy = lock features
    this.standBy = false;

    // subscribe to services to detect changes on totalBreweries
    this.BreweryService.totalBreweriesOnChange.subscribe(breweries => {
      this.totalBreweries = breweries;
    });

    // subscribe to services to detect changes on totalFarms
    this.FarmService.totalFarmsOnChange.subscribe(farms => {
      this.totalFarms = farms;
    });

    // Add the player beers
    this.beers = data.player.resources.beers;

    // Add the player all time beers
    this.PlayerService.totalBeersAllTimeOnChange.subscribe(beers => {
      this.totalBeersAllTime = beers;
    });

    // Add all perkSlots
    this.perkSlots = data.perkSlot;

    // Add all perks
    this.perks = perksList.perks;

    // Add all farms
    this.farms = data.farms;

    // Add all breweries
    this.breweries = data.breweries;

    // Add all upgrades
    this.upgrades = data.upgrades;

    this.player = new Player(this.beers, this.totalBeersAllTime,
      this.perkSlots, this.perks, this.farms, this.breweries, this.upgrades);

    setInterval(() => {
      this.BreweryService.setIncome(this.player);

      this.player.resources.farms.forEach((farm) => {
        farm.bank.qty += farm.bank.income;

        farm.bank.qty = Math.round((farm.bank.qty * 100) / 100);
      });
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
