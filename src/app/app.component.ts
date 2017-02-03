import {Component, OnInit} from '@angular/core';
import {Brewery, Consumable, Upgrade, Price, PerkSlot, Perk, Player} from "./models";
import {GlobalStatsService} from "./services/globalStats/global-stats.service";
import {BreweryService} from "./services/brewery/brewery.service";

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
  beers: Consumable;
  perkSlots: PerkSlot[];
  perks:Perk[];
  consumables: Consumable[];
  breweries: Brewery[];
  upgrades: Upgrade[];
  totalBreweries:number;
  totalBreweriesAllTime:number;
  income:number;
  totalBeersAllTime:number;
  appVersion;

  constructor(public GlobalStatsService:GlobalStatsService, public BreweryService:BreweryService) {
    this.appVersion = appVersion;
    this.perkSlots = [];
    this.perks = [];
    this.consumables = [];
    this.breweries = [];
    this.upgrades = [];
    this.totalBeersAllTime = 0;

    //subscribe to services to detect changes on totalBreweries
    this.BreweryService.totalBreweriesOnChange.subscribe(data => {
      this.totalBreweries = data;
    });

    // Add the player beers
    this.beers = data.player.resources.beers;

    // Add the player all time beers
    this.GlobalStatsService.totalBeersAllTimeOnChange.subscribe(data => {
      this.totalBeersAllTime = data;
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
      let price: Price[] = perk.price.map((p) => new Price(p.qty, this.beers));
      perk.price = price;
      this.perks.push(perk);
    });

    // Add all consumables
    data.consumables.forEach((consumable) => {
      let price: Price[] = consumable.price.map((p) => new Price(p.qty, this.beers));
      consumable.price = price;
      this.consumables.push(consumable);
    });

    // Add all breweries
    data.breweries.forEach((brewery) => {
      let price: Price[] = brewery.price.map((p) => {
        let consumable: Consumable;
        if(p.name === "Beers") {
          consumable = this.beers;
        } else {
          consumable = _.find(this.consumables, (consumable) => consumable.name === p.name);
        }
        return new Price(p.qty, consumable);
      });
      brewery.price = price;
      this.breweries.push(brewery);
    });

    // Add all upgrades
    data.upgrades.forEach((upgrade) => {
      let price: Price[] = upgrade.price.map((p) => new Price(p.qty, this.beers));
      upgrade.price = price;
      this.upgrades.push(upgrade);
    });

    this.player = new Player(this.beers, this.income, this.totalBeersAllTime ,this.perkSlots, this.perks, this.consumables, this.breweries, this.upgrades);

    setInterval(() => {
      this.player.resources.beers.qty += this.income;

      this.GlobalStatsService.setTotalBeersAllTime(this.income);
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
