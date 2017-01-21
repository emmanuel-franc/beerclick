import { Consumable } from "./consumable.model";
import { Beer } from "./beer.model";
import { Upgrade } from "./upgrade.model";
import { PerkSlot} from "./perkSlot.model";
import { Perk} from "./perk.model";

export class Player {
  resources: {
    money: Consumable;
    income:number,
    totalMoneyAllTime:number,
    perkSlots: PerkSlot[],
    perks: Perk[],
    consumables: Consumable[],
    beers: Beer[],
    upgrades: Upgrade[]
  };

  constructor(money, income, totalMoneyAllTime, perkSlots ,perks, consumables, beers, upgrades) {
    this.resources = {
      money: money,
      income: income,
      totalMoneyAllTime: totalMoneyAllTime,
      perkSlots: perkSlots,
      perks: perks,
      consumables: consumables,
      beers: beers,
      upgrades: upgrades
    }
  }
}
