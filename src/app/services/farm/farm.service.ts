import {Injectable, EventEmitter} from '@angular/core';
import {Player} from '../../models';

@Injectable()
export class FarmService {
  public totalFarms: number;
  // see http://stackoverflow.com/questions/35878160/angular2-how-to-share-data-change-between-components
  public totalFarmsOnChange: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.totalFarms = 0;
  }

  setTotalFarms(value) {
    // check if value is defined
    if (value) {
      this.totalFarms += value;
      this.totalFarmsOnChange.emit(this.totalFarms);
    }
  }

  setSubstractTotalFarms(value) {
    // check if value is defined
    if (value) {
      this.totalFarms -= value;
      this.totalFarmsOnChange.emit(this.totalFarms);
    }
  }

  createCerealsIncome(player, multiplicator: 1) {
    // check all farms to calculate income
    player.resources.farms.forEach((farm) => {
      farm.bank.income += farm.qty * farm.ratio * multiplicator;
    });

    return player;
  }
}
