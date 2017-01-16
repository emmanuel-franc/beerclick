import { Consumable } from "./consumable.model";
import { Beer } from "./beer.model";
import { Upgrade } from "./upgrade.model";

export class Player {
  resources: {
    money: Consumable;
    income:number,
    consumables: Consumable[],
    beers: Beer[],
    upgrades: Upgrade[]
  };

  constructor(money, income,consumables, beers, upgrades) {
    this.resources = {
      money: money,
      income: income,
      consumables: consumables,
      beers: beers,
      upgrades: upgrades
    }
  }
}
