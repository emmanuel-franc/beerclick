import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Farm, Brewery, Player } from '../../models';
import {BreweryService} from "../../services/brewery/brewery.service";
import {FarmService} from "../../services/farm/farm.service";

import * as _ from "lodash";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input() item: Farm | Brewery;
  @Input() player:Player;
  @Input() totalBreweriesAllTime:number;
  @Output() totalBreweriesAllTimeChange = new EventEmitter<number>();
  @Input() totalFarmsAllTime:number;
  @Output() totalFarmsAllTimeChange = new EventEmitter<number>();
  
  constructor(public BreweryService:BreweryService, public FarmService:FarmService) {
    this.totalBreweriesAllTime = this.totalBreweriesAllTime || 0;
    this.totalFarmsAllTime = this.totalFarmsAllTime || 0;
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

      if(item.category === "Breweries") {
        this.totalBreweriesAllTime += multiplicator;

        //send value to service
        this.BreweryService.setTotalBreweries(multiplicator);

        //send value of totalBeersAllTime to parent component (see @Output)
        this.totalBreweriesAllTimeChange.emit(this.totalBreweriesAllTime);

        //everytime we buy a brewery, we change income
        this.BreweryService.setIncome(this.player);
      }

      if(item.category === "Farms") {
        this.totalFarmsAllTime += multiplicator;

        //send value to service
        this.FarmService.setTotalFarms(multiplicator);

        //send value of totalFarmsAllTime to parent component (see @Output)
        this.totalFarmsAllTimeChange.emit(this.totalFarmsAllTime);

        //everytime we buy a farm, we change cereals' income
        this.FarmService.createCerealsIncome(this.player);
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
  
      if(item.category === "Breweries") {
        //send value to service
        this.BreweryService.setSubstractTotalBreweries(multiplicator);
  
        //everytime we sell a brewery, we change income
        this.BreweryService.setIncome(this.player);
      }

      if(item.category === "Farms") {
        //send value to service
        this.FarmService.setSubstractTotalFarms(multiplicator);

        //everytime we sell a farm, we change income
        //TODO: check this
        this.BreweryService.setIncome(this.player);
      }
    }
  }
}
