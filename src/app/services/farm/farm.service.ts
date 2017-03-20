import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class FarmService {
  public totalFarms:number;
  public totalFarmsOnChange:EventEmitter<any> = new EventEmitter(); //see http://stackoverflow.com/questions/35878160/angular2-how-to-share-data-change-between-components

  constructor() {
    this.totalFarms = 0;
  }

  setTotalFarms(value) {
    //check if value is defined
    if(value) {
      this.totalFarms += value;
      this.totalFarmsOnChange.emit(this.totalFarms);
    }
  }

  setSubstractTotalFarms(value) {
    //check if value is defined
    if(value) {
      this.totalFarms-= value;
      this.totalFarmsOnChange.emit(this.totalFarms);
    }
  }
}
