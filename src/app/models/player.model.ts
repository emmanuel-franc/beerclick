import { Consumable } from "./consumable.model";
import { Beer } from "./beer.model";

export class Player {
  resources: {
    money: Consumable;
    consumables: Consumable[],
    beers: Beer[]
  };

  constructor(money, consumables, beers) {
    this.resources = {
      money: money,
      consumables: consumables,
      beers: beers
    }
  }
}
