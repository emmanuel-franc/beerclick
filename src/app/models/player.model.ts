import { Consumable } from "./consumable.model";
import { Brewery } from "./brewery.model";
import { Upgrade } from "./upgrade.model";
import { PerkSlot} from "./perkSlot.model";
import { Perk} from "./perk.model";

export class Player {
  resources: {
    beers: Consumable;
    income:number,
    totalBeersAllTime:number,
    perkSlots: PerkSlot[],
    perks: Perk[],
    consumables: Consumable[],
    breweries: Brewery[],
    upgrades: Upgrade[]
  };

  constructor(beers, income, totalBeersAllTime, perkSlots ,perks, consumables, breweries, upgrades) {
    this.resources = {
      beers: beers,
      income: income,
      totalBeersAllTime: totalBeersAllTime,
      perkSlots: perkSlots,
      perks: perks,
      consumables: consumables,
      breweries: breweries,
      upgrades: upgrades
    }
  }
}
