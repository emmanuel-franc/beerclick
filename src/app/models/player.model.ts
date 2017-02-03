import { Consumable } from "./consumable.model";
import { Brewery } from "./brewery.model";
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
    breweries: Brewery[],
    upgrades: Upgrade[]
  };

  constructor(money, income, totalMoneyAllTime, perkSlots ,perks, consumables, breweries, upgrades) {
    this.resources = {
      money: money,
      income: income,
      totalMoneyAllTime: totalMoneyAllTime,
      perkSlots: perkSlots,
      perks: perks,
      consumables: consumables,
      breweries: breweries,
      upgrades: upgrades
    }
  }
}
