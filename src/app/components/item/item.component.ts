import { Component, Input } from '@angular/core';

import { Consumable, Beer } from '../../models';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  @Input() item: Consumable | Beer;

  constructor() {
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
    }
  }
}
