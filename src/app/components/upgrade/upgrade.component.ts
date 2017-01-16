import { Component, OnInit, Input } from '@angular/core';
import {Player} from "../../models/player.model";

import * as _ from "lodash";

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit {

  @Input() player: Player;

  constructor() {
  }

  ngOnInit() {
  }

  isBuyable(item): boolean {
    let buyable = true;

    item.forEach((price)=> {
      if(price.qty > price.consumable.qty) {
        buyable = false;
      }
    });

    return buyable;
  }
  
  buyUpgrade(item) {
    if(this.isBuyable(item.price)) {
      //set unlock on this upgrade
      let purchase = _.find(this.player.resources.upgrades, {'name': item.name});
      purchase.purchased = true;

      if(item.category === "consumables") {
        let unlock = _.find(this.player.resources.consumables, {'name': item.name});
        unlock.unlocked = true;
      }

      if(item.category === "beers") {
        let unlock = _.find(this.player.resources.beers, {'name': item.name});
        unlock.unlocked = true;
      }
    }
  }
}
