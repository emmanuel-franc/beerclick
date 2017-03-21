import { Injectable, EventEmitter } from '@angular/core';
import { BreweryService } from '../brewery/brewery.service';
import { PlayerService} from '../player/player.service';
import { Brewery, Perk } from '../../models';

import * as _ from "lodash";
import {Player} from "../../models/player.model";

@Injectable()
export class PerkService {
  constructor(public BreweryService:BreweryService, public PlayerService:PlayerService) {
  }

  setPerk(item, player, perkSlotId) {
    //empty previous perk
    if(player.resources.perkSlots[perkSlotId].assignedPerk) {
      this.removeBonus(player, perkSlotId);
    }

    //set item to purchased
    item.purchased = true;
    //set beers of player minus item's price
    item.price[0].consumable.qty -= item.price[0].qty;
    //set price of item to 0 because it has been bought. We want it to be clickable in the futur to be set to slot without any cost
    item.price[0].qty = 0;
    //add item to perkSlot with id returned by perkSlotId
    player.resources.perkSlots[perkSlotId].assignedPerk = item;

    //set bonus on player
    this.setBonus(item, player);
  }

  //TODO: not sure if it's the best way to do this, should be reworked
  setBonus(item, player: Player) {
    if(item.bonusTrigger === "income") {
      //set new income of player
      this.BreweryService.setIncome(player, item.bonus);
    }

    if(item.bonusTrigger === "Pilsner Brewery") {
      let getbonusTrigger: Brewery = _.find(player.resources.breweries, {'name': item.bonusTrigger});

      //set new bonus for pilsner  Brewery
      getbonusTrigger.ratio = getbonusTrigger.ratio * item.bonus;

      this.PlayerService.updatePlayer(player);
    }
  }

  //same as setBonus but in reverse.
  //also used in view
  //TODO: not sure if it's the best way to do this, should be reworked
  removeBonus(player: Player, perkSlotId) {
    if(player.resources.perkSlots[perkSlotId].assignedPerk.bonusTrigger === "income") {
      //set new income of player
      this.BreweryService.setIncome(player, 1);
    }

    if(player.resources.perkSlots[perkSlotId].assignedPerk.bonusTrigger === "Pilsner Brewery") {
      let getbonusTrigger: Brewery = _.find(player.resources.breweries, {'name': "Pilsner Brewery"});

      //set new bonus for pilsner Brewery by dividing actual assigned perk's bonus
      getbonusTrigger.ratio = getbonusTrigger.ratio / player.resources.perkSlots[perkSlotId].assignedPerk.bonus;

      this.BreweryService.setIncome(player);
    }

    //empty perk
    player.resources.perkSlots[perkSlotId].assignedPerk = new Perk;
  }
}
