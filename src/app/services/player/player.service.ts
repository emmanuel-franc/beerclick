import { Injectable, EventEmitter } from '@angular/core';

import {Player} from "../../models/player.model";

@Injectable()
export class PlayerService {
  public playerOnChange:EventEmitter<any> = new EventEmitter();
  constructor() {
  }

  updatePlayer(player) {
    this.playerOnChange.emit(player);
  }
}
