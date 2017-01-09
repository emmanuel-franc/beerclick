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
  isBuyable(item): boolean {
    let buyable = true;

    item.forEach((cost)=> {
      if(cost.qty > cost.type.qty) buyable = false;
    });

    return buyable;
  }

  buy(item): void {
    if(this.isBuyable(item.cost)) {
      item.cost.forEach((cost) => {
        cost.type.qty -= cost.qty;
      });

      item.qty += 1;
    }
  }


}
