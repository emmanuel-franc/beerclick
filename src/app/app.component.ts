import {Component, OnInit} from '@angular/core';
import {Beer, Consumable, Upgrade, Price, PerkSlot, Perk, Player} from "./models";
import {GlobalStatsService} from "./services/globalStats/global-stats.service";
import {BeerService} from "./services/beer/beer.service";

import * as _ from "lodash";

const data = require("../assets/data/data.json");
const perksList = require("../assets/data/perks.json");
const {version: appVersion} = require("../../package.json"); //http://stackoverflow.com/questions/34907682/how-to-display-app-version-in-angular2/35494456

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  player: Player;
  money: Consumable;
  perkSlots: PerkSlot[];
  perks:Perk[];
  consumables: Consumable[];
  beers: Beer[];
  upgrades: Upgrade[];
  totalBeers:number;
  totalBeersAllTime:number;
  income:number;
  totalMoneyAllTime:number;
  appVersion;

  constructor(public GlobalStatsService:GlobalStatsService, public BeerService:BeerService) {
    this.appVersion = appVersion;
    this.perkSlots = [];
    this.perks = [];
    this.consumables = [];
    this.beers = [];
    this.upgrades = [];
    this.totalMoneyAllTime = 0;

    //subscribe to services to detect changes on totalBeers
    this.BeerService.totalBeersOnChange.subscribe(data => {
      this.totalBeers = data;
    });

    // Add the player money
    this.money = data.player.resources.money;

    // Add the player all time money
    this.GlobalStatsService.totalMoneyAllTimeOnChange.subscribe(data => {
      this.totalMoneyAllTime = data;
    });

    //add the income
    this.GlobalStatsService.incomeOnChange.subscribe(data => {
      this.income = data;
    });
    if(!this.income) {
      this.income = 0;
    }

    // Add all perkSlots
    this.perkSlots = data.perkSlot;

    // Add all perks
    perksList.perks.forEach((perk) => {
      let price: Price[] = perk.price.map((p) => new Price(p.qty, this.money));
      perk.price = price;
      this.perks.push(perk);
    });

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

    this.player = new Player(this.money, this.income, this.totalMoneyAllTime ,this.perkSlots, this.perks, this.consumables, this.beers, this.upgrades);

    setInterval(() => {
      this.player.resources.money.qty += this.income;

      this.GlobalStatsService.setTotalMoneyAllTime(this.income);
    }, 1000);
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
  }
}
