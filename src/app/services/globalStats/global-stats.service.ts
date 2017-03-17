import { Injectable, EventEmitter } from '@angular/core';
import { Farm } from '../../models';

import * as _ from "lodash";

@Injectable()
export class GlobalStatsService {
  public totalBeersAllTime:number;
  public totalBeersAllTimeOnChange:EventEmitter<any> = new EventEmitter();
  public incomeOnChange:EventEmitter<any> = new EventEmitter();
  
  constructor() {
    this.totalBeersAllTime = 0;
  }

  createIncome(player, multiplicator) {
    //check all breweries to calculate income
    player.resources.income = player.resources.income || 0;

    let productionCostArray = [];

    player.resources.breweries.forEach((brewery) => {

      if(brewery.qty > 0) {
        brewery.productionCost.forEach((productionCost) => {
          //must cast: http://stackoverflow.com/questions/37978528/typescript-type-string-is-not-assignable-to-type
          let farm = _.find(player.resources.farms, {'name': productionCost.name});
          let foundFarm:Farm = farm as Farm;

          if (foundFarm.bank.qty > productionCost.qty * brewery.qty) {
            //push in array to make comparison
            productionCostArray.push(productionCost);

            foundFarm.bank.qty -= productionCost.qty * brewery.qty;
          }
        });

        if(productionCostArray.length === brewery.productionCost.length) {
          player.resources.income += (brewery.qty * brewery.ratio) * multiplicator;
        } else {
          //todo: create messages
          console.log('your' + brewery + 'has stopped producing beers because of lack of cereals');
        }

        productionCostArray.length = 0;
      }
    });
  }

  //whenever we setIncome, calculate via createIncome() then emit
  setIncome(player, multiplicator: number = 1) {
    this.incomeOnChange.emit(this.createIncome(player, multiplicator));
  }

  createCerealsIncome(player, multiplicator: number = 1) {
    //check all farms to calculate income
    player.resources.farms.forEach((farm) => {
      farm.bank.income += farm.qty * farm.ratio * multiplicator;
    });

    return player;
  }

  //TODO: check perf for this, not sure if it's the best way to do it since there is a set interval updating this value
  setTotalBeersAllTime(value) {
    if(value) {
      this.totalBeersAllTime += value;
      this.totalBeersAllTimeOnChange.emit(this.totalBeersAllTime);
    }
  }
}
