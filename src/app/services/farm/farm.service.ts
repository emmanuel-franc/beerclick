import {Injectable, EventEmitter} from '@angular/core';
import {PlayerService} from '../../services/player/player.service';

@Injectable()
export class FarmService {
  // see http://stackoverflow.com/questions/35878160/angular2-how-to-share-data-change-between-components

  constructor(public PlayerService: PlayerService) {
  }

  setTotalFarms(player, value) {
    // check if value is defined
    if (value) {
      player.resources.totalFarms += value;
      player.resources.totalFarmsAllTime += value;
    }
  }

  setSubstractTotalFarms(player, value) {
    // check if value is defined
    if (value) {
      player.resources.totalFarms -= value;
      player.resources.totalFarmsAllTime -= value;
    }
  }

  createCerealsIncome(player, multiplicator = 1) {
    // check all farms to calculate income
    player.resources.farms.forEach((farm) => {
      farm.bank.income += farm.qty * farm.ratio * multiplicator;
    });

    return player;
  }
}
