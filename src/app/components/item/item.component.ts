import { Component, Input } from '@angular/core';

import { Consumable,
  Beer,
  Price,
  Player } from '../../models';

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
      if((price.qty * multiplicator) >= price.type.qty) {
        buyable = false; // If not buyable, set variable to false (see line 21)
      }
    });

    return buyable;
  }

  buy(item, multiplicator: number = 1): void { // multiplicator default value = 1 (same as if statement)
    if(this.isBuyable(item.price, multiplicator)) {
      item.cost.forEach((price) => {
        price.type.qty -= (price.qty * multiplicator);

        item.qty += 1 * multiplicator;
      });
    }
  }

  sell(item, multiplicator: number = 1): void {
    if(item.qty * multiplicator > 0) {
      // Remove one from the item
      item.qty -= (1 * multiplicator);

      // Add X% of the item cost, to the stock
      item.cost.forEach((price) => {
        if(price.type.name == "money") {
          price.type.qty += (price.qty * multiplicator) / 2;
        }
      });
    }
  }
}
