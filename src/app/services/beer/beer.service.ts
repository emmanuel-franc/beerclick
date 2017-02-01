import { Injectable, EventEmitter } from '@angular/core';

import * as _ from "lodash";


@Injectable()
export class BeerService {
  public totalBeers:number;
  public totalBeersOnChange:EventEmitter<any> = new EventEmitter(); //see http://stackoverflow.com/questions/35878160/angular2-how-to-share-data-change-between-components

  constructor() {
    this.totalBeers = 0;
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
}