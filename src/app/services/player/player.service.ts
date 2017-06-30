import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class PlayerService {
  public playerOnChange: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  updatePlayer(player) {
    this.playerOnChange.emit(player);
    localStorage.setItem('BeerClickPlayer', JSON.stringify(player));
  }

  // TODO: check perf for this, not sure if it's the best way to do it since there is a set interval updating this value
  setTotalBeersAllTime(player, value) {
    if (value) {
      player.resources.totalBeersAllTime += Math.round((value * 100) / 100);
    }
  }
  
  setNewPrice(item): void {
    // formula is : Price = baseCost * multiplier(^itemQuantity).
    item.price = item.baseCost * Math.pow(1.07, item.qty);
    
    if (item.price < item.baseCost) {
      item.price = item.baseCost;
    }
    
    item.price = Math.round((item.price * 100) / 100);
  }
}
