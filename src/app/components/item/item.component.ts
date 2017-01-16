import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Consumable, Beer } from '../../models';
import {GlobalStatsService} from "../../services/globalStats/global-stats.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input() item: Consumable | Beer;
  @Input() totalBeersAllTime:number;
  @Output() totalBeersAllTimeChange = new EventEmitter<number>();
  
  constructor(public GlobalStatsService:GlobalStatsService) {
    this.totalBeersAllTime = this.totalBeersAllTime || 0;
  }

  isBuyable(item, multiplicator: number = 1): boolean {
    let buyable = true; // Item is true by default because ALL cost must be buyable

    item.forEach((price)=> {
      if((price.qty * multiplicator) > price.consumable.qty) {
        buyable = false; // If not buyable, set variable to false (see line 21)
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

        this.totalBeersAllTimeChange.emit(this.totalBeersAllTime); //send value of totalBeers to parent component
      }
    }
  }

  sell(item, multiplicator: number = 1): void {
    if(item.qty  >= multiplicator) { // If we have more item then we want to sell
      // Remove one from the item
      item.qty -= multiplicator;

      // Add X% of the item cost, to the stock
      item.price.forEach((price) => {
        if(price.consumable.category  === "bank") {
          price.consumable.qty += (price.qty * multiplicator) / 2;
        }
      });
  
      if(item.category === "Beers") {
        //send value to service
        this.GlobalStatsService.setSubstractTotalBeers(multiplicator);
      }
    }
  }
}
