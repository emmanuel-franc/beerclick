import { Consumable } from "./consumable.model";
import { Beer } from "./beer.model";
import { Upgrade } from "./upgrade.model";

export class Player {
  resources: {
    money: Consumable;
    consumables: Consumable[],
    beers: Beer[],
    upgrades: Upgrade[]
  };

  constructor(money, consumables, beers, upgrades) {
    this.resources = {
      money: money,
      consumables: consumables,
      beers: beers,
      upgrades: upgrades
    }
  }
}
