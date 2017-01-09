import { Component, Input } from '@angular/core';

import { Consumable,
  Beer,
  Cost,
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

    item.forEach((cost)=> {
      if((cost.qty * multiplicator) > cost.type.qty) {
        buyable = false; // If not buyable, set variable to false (see line 21)
      }
    });

    return buyable;
  }

  buy(item, multiplicator: number = 1): void { // multiplicator default value = 1 (same as if statement)
    if(this.isBuyable(item.cost)) {
      item.cost.forEach((cost) => {
        cost.type.qty -= (cost.qty * multiplicator);
      });

      item.qty += 1;
    }
  }

  sell(item): void {
    if(item.qty > 0) {
      // Remove one from the item
      item.qty -= 1;

      // Add X% of the item cost, to the stock
      item.cost.forEach((cost) => {
        if(cost.type.name == "money") {
          cost.type.qty += (cost.qty / 2);
        }
      });
    }
  }
}
