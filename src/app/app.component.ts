import {Component} from '@angular/core';
import {Beer, Consumable, Price, Player} from "./models";

import * as _ from "lodash";

const data = require("../assets/data/data.json");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  player: Player;
  money: Consumable;
  consumables: Consumable[];
  beers: Beer[];
  totalBeers:number;

  constructor() {
    this.consumables = [];
    this.beers = [];
    this.totalBeers = this.totalBeers || 0;

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

    this.player = new Player(this.money, this.consumables, this.beers);

    setInterval(() => {
      let income = 1;
      this.player.resources.beers.forEach((beer) => {
        income += beer.qty * beer.ratio;
      });

      this.player.resources.money.qty += income;
    }, 1000);
  }
}
