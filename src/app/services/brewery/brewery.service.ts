import {Injectable, EventEmitter} from '@angular/core';
import {Farm} from '../../models';
import {PlayerService} from '../../services/player/player.service';

@Injectable()
export class BreweryService {
  public totalBreweries: number;
  // see http://stackoverflow.com/questions/35878160/angular2-how-to-share-data-change-between-components
  public totalBreweriesOnChange: EventEmitter<any> = new EventEmitter();
  public incomeOnChange: EventEmitter<any> = new EventEmitter();
  public overloadProduction: EventEmitter<any> = new EventEmitter();

  constructor(public PlayerService: PlayerService) {
    this.totalBreweries = 0;
  }

  setTotalBreweries(value) {
    // check if value is defined
    if (value) {
      this.totalBreweries += value;
      this.totalBreweriesOnChange.emit(this.totalBreweries);
    }
  }

  setSubstractTotalBreweries(value) {
    // check if value is defined
    if (value) {
      this.totalBreweries -= value;
      this.totalBreweriesOnChange.emit(this.totalBreweries);
    }
  }

  resetTotalBreweries() {
    this.totalBreweries = 0;
    this.totalBreweriesOnChange.emit(this.totalBreweries);
  }

  createIncome(player, multiplicator: number) {
    // check all breweries to calculate income
    let productionCostArray = [];

    player.resources.breweries.forEach((brewery) => {
      let bonusArray = brewery.bonus;
      let sum = bonusArray.reduce((a, b) => a + b, 0);
      let bonus = bonusArray.length ? multiplicator + sum : multiplicator;

      if (brewery.qty > 0) {
        brewery.productionCost.forEach((productionCost) => {
          // must cast: http://stackoverflow.com/questions/37978528/typescript-type-string-is-not-assignable-to-type
          let farm = player.resources.farms.find(function(farm){
            return farm.name === productionCost.name;
          });

          let foundFarm: Farm = farm as Farm;

          if (foundFarm.bank.qty > productionCost.qty * brewery.qty) {
            // push in array to make comparison
            productionCostArray.push(productionCost);

            foundFarm.bank.qty -= productionCost.qty * brewery.qty;
          }
        });

        if (productionCostArray.length === brewery.productionCost.length) {
          player.resources.beers.qty += (brewery.qty * brewery.ratio) * bonus;

          player.resources.beers.qty = Math.round((player.resources.beers.qty * 100) / 100);

          this.PlayerService.setTotalBeersAllTime((brewery.qty * brewery.ratio) * bonus);

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

  // whenever we setIncome, calculate via createIncome() then emit
  setIncome(player, multiplicator = 1) {
    this.incomeOnChange.emit(this.createIncome(player, multiplicator));
  }
}
