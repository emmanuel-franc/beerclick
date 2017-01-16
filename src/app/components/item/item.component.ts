import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Consumable, Beer, Player } from '../../models';
import {GlobalStatsService} from "../../services/globalStats/global-stats.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input() item: Consumable | Beer;
  @Input() player:Player;
  @Input() totalBeersAllTime:number;
  @Output() totalBeersAllTimeChange = new EventEmitter<number>();
  
  constructor(public GlobalStatsService:GlobalStatsService) {
    this.totalBeersAllTime = this.totalBeersAllTime || 0;
  }

  isBuyable(item, multiplicator: number = 1): boolean {
    let buyable = true; // Item is true by default because ALL cost must be buyable

    item.forEach((price)=> {
      if((price.qty * multiplicator) > price.consumable.qty) {
        buyable = false; // If not buyable, set variable to false
      }
    });

    return buyable;
  }

  buy(item, multiplicator: number = 1): void { // multiplicator default value = 1 (same as if statement)
    if(this.isBuyable(item.price, multiplicator)) {
      item.price.forEach((price) => {
        price.consumable.qty -= (price.qty * multiplicator);
      });

      item.qty += multiplicator;

      if(item.category === "Beers") {
        this.totalBeersAllTime += multiplicator;

        //send value to service
        this.GlobalStatsService.setTotalBeers(multiplicator);

        //send value of totalBeersAllTime to parent component (see @Output)
        this.totalBeersAllTimeChange.emit(this.totalBeersAllTime);

        //everytime we buy a beer, we change income
        this.GlobalStatsService.setIncome(this.player);
      }
    }
  }

  sell(item, multiplicator: number = 1): void {
    // If we have more item than we want to sell
    if(item.qty  >= multiplicator) {
      // Remove multiplicator from the item
      item.qty -= multiplicator;

      // Add X% of the item cost, to the stock
      item.price.forEach((price) => {
        if(price.consumable.category  === "bank") {
          price.consumable.qty += (price.qty * multiplicator) / 2;
        }
      });
  
      //only if beers because we don't mind consumable yet
      if(item.category === "Beers") {
        //send value to service
        this.GlobalStatsService.setSubstractTotalBeers(multiplicator);
  
        //everytime we sell a beer, we change income
        this.GlobalStatsService.setIncome(this.player);
      }
    }
  }
}
