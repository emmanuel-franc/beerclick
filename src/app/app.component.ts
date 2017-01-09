import { Component } from '@angular/core';
import { Beer, Consumable, Cost, Player } from "./models"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  money: Consumable = {
    name: 'money',
    qty: 0
  };

  hop: Consumable = {
    name: 'hop',
    qty: 0,
    cost: [new Cost(10, this.money)]
  };

  malt: Consumable = {
    name: 'malt',
    qty: 0,
    cost: [new Cost(10, this.money)]
  };

  stout: Beer = {
    name: 'stout',
    qty: 0,
    cost: [new Cost(10, this.money), new Cost(1, this.hop)],
    ratio: 1.5
  };

  lagger: Beer = {
    name: 'lagger',
    qty: 0,
    cost: [new Cost(2, this.hop), new Cost(1, this.malt)],
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
  }

}
