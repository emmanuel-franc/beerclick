import { Injectable, EventEmitter } from '@angular/core';

import { GlobalStatsService } from '../globalStats/global-stats.service'
import { Beer, Perk } from '../../models';

import * as _ from "lodash";
import {Player} from "../../models/player.model";

@Injectable()
export class PerkService {
  constructor(public GlobalStatsService:GlobalStatsService) {
  }

  setPerk(item, player, perkSlotId) {
    //empty previous perk
    if(player.resources.perkSlots[perkSlotId].assignedPerk) {
      this.removeBonus(player, perkSlotId);
      player.resources.perkSlots[perkSlotId].assignedPerk = {};
    }

    //set item to purchased
    item.purchased = true;
    //set money of player minus item's price
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
      this.GlobalStatsService.setIncome(player, item.bonus);
    }

    if(item.bonusTrigger === "Pilsner") {
      let getbonusTrigger: Beer = _.find(player.resources.beers, {'name': item.bonusTrigger});

      //set new bonus for pilsner
      getbonusTrigger.ratio = getbonusTrigger.ratio * item.bonus;

      //TODO: create a player service, actually sending setIncome because we must send player
      this.GlobalStatsService.setIncome(player);
    }
  }

  //same as setBonus but in reverse.
  //also used in view
  //TODO: not sure if it's the best way to do this, should be reworked
  removeBonus(player: Player, perkSlotId) {
    //empty perk
    player.resources.perkSlots[perkSlotId].assignedPerk = new Perk;

    console.log('hello', player.resources.perkSlots[perkSlotId].assignedPerk)

    if(player.resources.perkSlots[perkSlotId].assignedPerk.bonusTrigger === "income") {
      console.log('coucou')

      //get actual income of player and divid it by assignedPerk bonus
      let newIncome = player.resources.income / player.resources.perkSlots[perkSlotId].assignedPerk.bonus

      //set new income of player
      this.GlobalStatsService.setIncome(player, newIncome);
    }

    if(player.resources.perkSlots[perkSlotId].assignedPerk.bonusTrigger === "Pilsner") {
      let getbonusTrigger: Beer = _.find(player.resources.beers, {'name': "Pilsner"});

      //set new bonus for pilsner by dividing actual assigned perk's bonus
      getbonusTrigger.ratio = getbonusTrigger.ratio / player.resources.perkSlots[perkSlotId].assignedPerk.bonus;

      //TODO: create a player service, actually sending setIncome because we must send player
      this.GlobalStatsService.setIncome(player);
    }
  }
}