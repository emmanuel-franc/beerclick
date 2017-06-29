import {Beers} from './beers.model';
import {Farm} from './farm.model';
import {Brewery} from './brewery.model';
import {Upgrade} from './upgrade.model';
import {PerkSlot} from './perkSlot.model';
import {Perk} from './perk.model';

export class Player {
  resources: {
    beers: Beers;
    totalBeersAllTime: number,
    perkSlots: PerkSlot[],
    perks: Perk[],
    farms: Farm[],
    totalFarms: number;
    totalFarmsAllTime: number;
    breweries: Brewery[],
    totalBreweries: number;
    totalBreweriesAllTime: number;
    upgrades: Upgrade[]
  };

  constructor(beers, totalBeersAllTime, perkSlots, perks, farms, totalFarms, totalFarmsAllTime, breweries, totalBreweries,totalBreweriesAllTime, upgrades) {
    this.resources = {
      beers: beers,
      totalBeersAllTime: totalBeersAllTime,
      perkSlots: perkSlots,
      perks: perks,
      farms: farms,
      totalFarms: totalFarms,
      totalFarmsAllTime: totalFarmsAllTime,
      breweries: breweries,
      totalBreweries: totalBreweries,
      totalBreweriesAllTime: totalBreweriesAllTime,
      upgrades: upgrades
    };
  }
}
