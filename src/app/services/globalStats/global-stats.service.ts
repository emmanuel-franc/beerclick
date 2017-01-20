import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class GlobalStatsService {
  public totalBeers:number;
  public totalMoneyAllTime:number;
  public totalBeersOnChange:EventEmitter<any> = new EventEmitter(); //see http://stackoverflow.com/questions/35878160/angular2-how-to-share-data-change-between-components
  public totalMoneyAllTimeOnChange:EventEmitter<any> = new EventEmitter();
  public incomeOnChange:EventEmitter<any> = new EventEmitter();
  
  constructor() {
    this.totalBeers = 0;
    this.totalMoneyAllTime = 0;
  }

  setTotalBeers(value) {
    //check if value is defined
    if(value) {
      this.totalBeers += value;
      this.totalBeersOnChange.emit(this.totalBeers);
    }
  }

  setSubstractTotalBeers(value) {
    //check if value is defined
    if(value) {
      this.totalBeers -= value;
      this.totalBeersOnChange.emit(this.totalBeers);
    }
  }

  resetTotalBeers() {
    this.totalBeers = 0;
    this.totalBeersOnChange.emit(this.totalBeers);
  }

  getIncome(player) {
    //check all beers to calculate income
    let income = 0;
    player.resources.beers.forEach((beer) => {
      income += beer.qty * beer.ratio;
    });

    //set income of player (this.player)
    player.resources.income = income;

    return income;
  }

  //whenever we setIncome, calculate via getIncome() then emit
  setIncome(player) {
    this.incomeOnChange.emit(this.getIncome(player));
  }

  //TODO: check perf for this, not sure if it's the best way to do it since there is a set interval updating this value
  setTotalMoneyAllTime(value) {
    if(value) {
      this.totalMoneyAllTime += value;
      this.totalMoneyAllTimeOnChange.emit(this.totalMoneyAllTime);
    }
  }
}
