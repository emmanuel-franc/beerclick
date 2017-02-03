import { Injectable, EventEmitter } from '@angular/core';

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
    let income = 0;
    player.resources.breweries.forEach((brewery) => {
      income += brewery.qty * brewery.ratio;
    });

    //set income of player (this.player)
    player.resources.income = income * multiplicator;

    return player.resources.income;
  }

  //whenever we setIncome, calculate via createIncome() then emit
  setIncome(player, multiplicator: number = 1) {
    this.incomeOnChange.emit(this.createIncome(player, multiplicator));
  }

  //TODO: check perf for this, not sure if it's the best way to do it since there is a set interval updating this value
  setTotalBeersAllTime(value) {
    if(value) {
      this.totalBeersAllTime += value;
      this.totalBeersAllTimeOnChange.emit(this.totalBeersAllTime);
    }
  }
}
