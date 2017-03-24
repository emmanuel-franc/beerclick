import { Injectable, EventEmitter } from '@angular/core';
import { Farm } from '../../models';
import { PlayerService } from '../../services/player/player.service';

import * as _ from "lodash";

@Injectable()
export class BreweryService {
  public totalBreweries:number;
  public totalBreweriesOnChange:EventEmitter<any> = new EventEmitter(); //see http://stackoverflow.com/questions/35878160/angular2-how-to-share-data-change-between-components
  public incomeOnChange:EventEmitter<any> = new EventEmitter();
  public overloadProduction:EventEmitter<any> = new EventEmitter();

  constructor(public PlayerService:PlayerService) {
    this.totalBreweries = 0;
  }

  setTotalBreweries(value) {
    //check if value is defined
    if(value) {
      this.totalBreweries += value;
      this.totalBreweriesOnChange.emit(this.totalBreweries);
    }
  }

  setSubstractTotalBreweries(value) {
    //check if value is defined
    if(value) {
      this.totalBreweries-= value;
      this.totalBreweriesOnChange.emit(this.totalBreweries);
    }
  }

  resetTotalBreweries() {
    this.totalBreweries = 0;
    this.totalBreweriesOnChange.emit(this.totalBreweries);
  }

  createIncome(player, multiplicator) {
    //check all breweries to calculate income
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
          player.resources.beers.qty += (brewery.qty * brewery.ratio) * multiplicator;

          player.resources.beers.qty = Math.round((player.resources.beers.qty * 100) / 100);

          this.PlayerService.setTotalBeersAllTime((brewery.qty * brewery.ratio) * multiplicator);

          brewery.overload = false;
          this.overloadProduction.emit(brewery);
        } else {
          brewery.overload = true;
          this.overloadProduction.emit(brewery);
        }

        productionCostArray.length = 0;
      }
    });

    return player.resources.beers.qty;
  }

  //whenever we setIncome, calculate via createIncome() then emit
  setIncome(player, multiplicator: number = 1) {
    this.incomeOnChange.emit(this.createIncome(player, multiplicator));
  }
}