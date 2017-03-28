import {Injectable, EventEmitter} from '@angular/core';

import {Player} from '../../models/player.model';

@Injectable()
export class PlayerService {
  public playerOnChange: EventEmitter<any> = new EventEmitter();
  public totalBeersAllTime: number;
  public totalBeersAllTimeOnChange: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.totalBeersAllTime = 0;
  }

  updatePlayer(player) {
    this.playerOnChange.emit(player);
  }

  // TODO: check perf for this, not sure if it's the best way to do it since there is a set interval updating this value
  setTotalBeersAllTime(value) {
    if (value) {
      this.totalBeersAllTime += Math.round((value * 100) / 100);
      this.totalBeersAllTimeOnChange.emit(this.totalBeersAllTime);
    }
  }
}
