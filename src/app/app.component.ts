import {Component, OnInit} from '@angular/core';
import {Beer, Consumable, Upgrade, Price, Player} from "./models";
import {GlobalStatsService} from "./services/globalStats/global-stats.service";

import * as _ from "lodash";

const data = require("../assets/data/data.json");
const {version: appVersion} = require("../../package.json"); //http://stackoverflow.com/questions/34907682/how-to-display-app-version-in-angular2/35494456

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  player: Player;
  money: Consumable;
  consumables: Consumable[];
  beers: Beer[];
  upgrades: Upgrade[];
  totalBeers:number;
  totalBeersAllTime:number;
  appVersion;

  constructor(public GlobalStatsService:GlobalStatsService) {
    this.appVersion = appVersion;
    this.consumables = [];
    this.beers = [];
    this.upgrades = [];
    //this.totalBeers = 0;
    this.totalBeersAllTime = this.totalBeersAllTime || 0;

    //subscribe to services to detect changes on totalBeers
    this.GlobalStatsService.totalBeersOnChange.subscribe(data => {
      this.totalBeers = data;
    });

    // Add the player money
    this.money = data.player.resources.money;

    // Add all consumables
    data.consumables.forEach((consumable) => {
      let price: Price[] = consumable.price.map((p) => new Price(p.qty, this.money));
      consumable.price = price;
      this.consumables.push(consumable);
    });

    // Add all beers
    data.beers.forEach((beer) => {
      let price: Price[] = beer.price.map((p) => {
        let consumable: Consumable;
        if(p.name === "$") {
          consumable = this.money;
        } else {
          consumable = _.find(this.consumables, (consumable) => consumable.name === p.name);
        }
        return new Price(p.qty, consumable);
      });
      beer.price = price;
      this.beers.push(beer);
    });

    // Add all upgrades
    data.upgrades.forEach((upgrade) => {
      let price: Price[] = upgrade.price.map((p) => new Price(p.qty, this.money));
      upgrade.price = price;
      this.upgrades.push(upgrade);
    });

    this.player = new Player(this.money, this.consumables, this.beers, this.upgrades);
  }
  
  ngOnInit(){
    //check date to launch Seasonal Events
    let actualDate = new Date();
    
    //if it's <seasonal event> unlock upgrades
    if(actualDate.getMonth() >= 0 &&
      actualDate.getDate() >= 15){ //TODO: set a limit in time of Seasonal Events
      let unlockChristmasEventUpgrades = _.filter(this.player.resources.upgrades, {"seasonalEvent": "Christmas"});
      
      unlockChristmasEventUpgrades.forEach((upgrade) => {
        upgrade.unlocked = true;
      });
    }
  
    setInterval(() => {
      let income = 1;
      this.player.resources.beers.forEach((beer) => {
        income += beer.qty * beer.ratio;
      });
    
      this.player.resources.money.qty += income;
    }, 1000);
  }
}
