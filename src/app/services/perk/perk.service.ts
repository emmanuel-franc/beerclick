import {Injectable} from '@angular/core';
import {PlayerService} from '../player/player.service';
import {Brewery, Perk} from '../../models';

import {Player} from '../../models/player.model';

@Injectable()
export class PerkService {
  constructor(public PlayerService: PlayerService) {
  }

  setPerk(item, player, perkSlotId) {
    // empty previous perk
    if (player.resources.perkSlots[perkSlotId].assignedPerk) {
      this.removeBonus(player, perkSlotId);
    }

    // set item to purchased
    item.purchased = true;
    // set beers of player minus item's price
    player.resources.beers.qty -= item.price;
    // set price of item to 0 because it has been bought. We want it to be clickable in the futur to be set to slot without any cost
    item.price = 0;
    // add item to perkSlot with id returned by perkSlotId
    player.resources.perkSlots[perkSlotId].assignedPerk = item;

    // set bonus on player
    this.setBonus(item, player);
  }

  // TODO: not sure if it's the best way to do this, should be reworked
  setBonus(item, player: Player) {
    if (item.bonusTrigger === 'income') {
      // set new income of each brewery
      player.resources.breweries.forEach((brewery) => {
        brewery.bonus.push(item.bonus);
      });
    }

    if (item.bonusTrigger === 'Pilsner Brewery') {
      let getBonusTrigger: Brewery = player.resources.breweries.find(function(element) {
        return element.name === item.bonusTrigger;
      });
      getBonusTrigger.bonus.push(item.bonus);
    }

    this.PlayerService.updatePlayer(player);
  }

  // same as setBonus but in reverse.
  // also used in view
  // TODO: not sure if it's the best way to do this, should be reworked
  removeBonus(player: Player, perkSlotId) {
    let assignedPerk: Perk = player.resources.perkSlots[perkSlotId].assignedPerk;

    if (assignedPerk.bonusTrigger === 'income') {
      // set new income of each brewery
      player.resources.breweries.forEach((brewery) => {
        let indexOfFirstBonus = brewery.bonus.indexOf(assignedPerk.bonus);
        brewery.bonus.splice(1, indexOfFirstBonus);
      });
    }

    if (assignedPerk.bonusTrigger === 'Pilsner Brewery') {
      let getBonusTrigger: Brewery = player.resources.breweries.find(function(element) {
        return element.name === 'Pilsner Brewery';
      });

      let indexOfFirstBonus = getBonusTrigger.bonus.indexOf(assignedPerk.bonus);

      getBonusTrigger.bonus.splice(1, indexOfFirstBonus);
    }

    // empty perk
    player.resources.perkSlots[perkSlotId].assignedPerk = new Perk;

    this.PlayerService.updatePlayer(player);
  }
}
