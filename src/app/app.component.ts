import { Component } from '@angular/core';
import { Beer, Consumable, Price, Player } from "./models"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  money: Consumable = {
    name: '$',
    type: 'bank',
    qty: 0
  };

  hop: Consumable = {
    name: 'hop',
    type: 'cereal',
    qty: 0,
    price: [new Price(10, this.money)]
  };

  malt: Consumable = {
    name: 'malt',
    type: 'cereal',
    qty: 0,
    price: [new Price(10, this.money)]
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
    ressources: {
      money: this.money,
      consumables: [this.malt, this.hop],
      beers: [this.stout, this.lagger]
    }
  };

  constructor() {

    setInterval(() => {
      let income = 1;
      this.player.ressources.beers.forEach((beer) => {
        // TODO add decimals
        income += Math.floor(beer.qty * beer.ratio);
      });

      this.player.ressources.money.qty += income;
    }, 1000);
  }

}
