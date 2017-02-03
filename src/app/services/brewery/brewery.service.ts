import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class BreweryService {
  public totalBreweries:number;
  public totalBreweriesOnChange:EventEmitter<any> = new EventEmitter(); //see http://stackoverflow.com/questions/35878160/angular2-how-to-share-data-change-between-components

  constructor() {
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
}