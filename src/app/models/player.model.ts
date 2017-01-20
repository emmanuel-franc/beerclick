import { Consumable } from "./consumable.model";
import { Beer } from "./beer.model";
import { Upgrade } from "./upgrade.model";
import { Perk } from "./perk.model";

export class Player {
  resources: {
    money: Consumable;
    income:number,
    totalMoneyAllTime:number,
    perks: Perk[],
    consumables: Consumable[],
    beers: Beer[],
    upgrades: Upgrade[]
  };

  constructor(money, income, totalMoneyAllTime, perk, consumables, beers, upgrades) {
    this.resources = {
      money: money,
      income: income,
      totalMoneyAllTime: totalMoneyAllTime,
      perks: perk,
      consumables: consumables,
      beers: beers,
      upgrades: upgrades
    }
  }
}
