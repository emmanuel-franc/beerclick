import { Injectable, EventEmitter } from '@angular/core';

import * as _ from "lodash";

@Injectable()
export class GlobalStatsService {
  public totalBeersAllTime:number;
  public totalBeersAllTimeOnChange:EventEmitter<any> = new EventEmitter();
  
  constructor() {
    this.totalBeersAllTime = 0;
  }

  //TODO: check perf for this, not sure if it's the best way to do it since there is a set interval updating this value
  setTotalBeersAllTime(value) {
    if(value) {
      this.totalBeersAllTime += value;
      this.totalBeersAllTimeOnChange.emit(this.totalBeersAllTime);
    }
  }
}
