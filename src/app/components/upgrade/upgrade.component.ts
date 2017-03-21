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

    if(item.price > this.player.resources.beers.qty) {
      buyable = false;
    }

    return buyable;
  }
  
  buyUpgrade(item) {
    if(this.isBuyable(item)) {
      //substract to player's beers qty the price
      this.player.resources.beers.qty -= item.price;

      //set unlock on this upgrade
      let purchase = _.find(this.player.resources.upgrades, {'name': item.name});
      purchase.purchased = true;

      if(item.category === "farms") {
        let unlock = _.find(this.player.resources.farms, {'name': item.name});
        unlock.unlocked = true;
      }

      if(item.category === "breweries") {
        let unlock = _.find(this.player.resources.breweries, {'name': item.name});
        unlock.unlocked = true;
      }
    }
  }
}
