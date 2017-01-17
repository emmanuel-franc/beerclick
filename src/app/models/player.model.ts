import { Consumable } from "./consumable.model";
import { Beer } from "./beer.model";
import { Upgrade } from "./upgrade.model";
import { Perk } from "./perk.model";

export class Player {
  resources: {
    money: Consumable;
    income:number,
    perks: Perk[],
    consumables: Consumable[],
    beers: Beer[],
    upgrades: Upgrade[]
  };

  constructor(money, income, perk, consumables, beers, upgrades) {
    this.resources = {
      money: money,
      income: income,
      perks: perk,
      consumables: consumables,
      beers: beers,
      upgrades: upgrades
    }
  }
}
