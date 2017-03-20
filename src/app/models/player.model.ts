import { Consumable } from "./consumable.model";
import { Farm } from "./farm.model";
import { Brewery } from "./brewery.model";
import { Upgrade } from "./upgrade.model";
import { PerkSlot} from "./perkSlot.model";
import { Perk} from "./perk.model";

export class Player {
  resources: {
    beers: Consumable;
    totalBeersAllTime:number,
    perkSlots: PerkSlot[],
    perks: Perk[],
    farms: Farm[],
    breweries: Brewery[],
    upgrades: Upgrade[]
  };

  constructor(beers, totalBeersAllTime, perkSlots ,perks, farms, breweries, upgrades) {
    this.resources = {
      beers: beers,
      totalBeersAllTime: totalBeersAllTime,
      perkSlots: perkSlots,
      perks: perks,
      farms: farms,
      breweries: breweries,
      upgrades: upgrades
    }
  }
}
