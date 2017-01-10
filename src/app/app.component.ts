import { Component } from '@angular/core';
import { Beer, Consumable, Price, Player } from "./models";

const data = require("../assets/data/data.json");

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

/*  money: Consumable = {
    name: '$',
    category: 'bank',
    qty: 100,
    unlocked: true
  };

  hop: Consumable = {
    name: 'hop',
    category: 'cereal',
    qty: 0,
    price: [new Price(10, this.money)],
    unlocked: true
  };

  malt: Consumable = {
    name: 'malt',
    category: 'cereal',
    qty: 0,
    price: [new Price(10, this.money)],
    unlocked: true
  };

  stout: Beer = {
    name: 'stout',
    type: 'beer',
    qty: 0,
    price: [new Price(10, this.money), new Price(1, this.hop)],
    ratio: 1.5
  };

  lagger: Beer = {
    name: 'lagger',
    type: 'beer',
    qty: 0,
    price: [new Price(2, this.hop), new Price(1, this.malt)],
    ratio: 1.2
  };

  player: Player = {
    resources: {
      money: this.money,
      consumables: [this.malt, this.hop],
      beers: [this.stout, this.lagger]
    }
  };*/

  player: Player;
  money: Consumable;
  consumables: Consumable[];
  beers: Beer[];

  constructor() {
    this.consumables = [];
    this.beers = [];
    
    // Add the player money
    this.money = data.player.resources.money;
  
    // Add all consumables
    data.consumables.forEach((consumable) => {
      this.consumables.push(consumable);
    });

    // Add all beers
    data.beers.forEach((beer) => {
      this.beers.push(beer);
    });

    this.player = new Player(this.money, this.consumables, this.beers);

    console.log(this.player)

/*    setInterval(() => {
      let income = 1;
      this.player.resources.beers.forEach((beer) => {
        // TODO add decimals
        income += Math.floor(beer.qty * beer.ratio);
      });

      this.player.resources.money.qty += income;
    }, 1000);*/
  }

}
