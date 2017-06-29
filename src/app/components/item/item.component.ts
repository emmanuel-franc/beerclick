import {Component, Inject, Input, Output, EventEmitter} from '@angular/core';

import { APP_CONFIG, AppConfig } from '../../app-config/app-config.module';

import {Farm, Brewery, Player} from '../../models';
import {PlayerService} from '../../services/player/player.service';
import {BreweryService} from '../../services/brewery/brewery.service';
import {FarmService} from '../../services/farm/farm.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input() item: Farm | Brewery;
  @Input() player: Player;
  @Input() totalBreweriesAllTime: number;
  @Output() totalBreweriesAllTimeChange = new EventEmitter<number>();
  @Input() totalFarmsAllTime: number;
  @Output() totalFarmsAllTimeChange = new EventEmitter<number>();

  constructor(public PlayerService: PlayerService,
              public BreweryService: BreweryService,
              public FarmService: FarmService,
              @Inject(APP_CONFIG) private config: AppConfig) {
    this.totalBreweriesAllTime = this.totalBreweriesAllTime || 0;
    this.totalFarmsAllTime = this.totalFarmsAllTime || 0;
  }

  isBuyable(price, multiplicator = 1): boolean {
    let buyable = true; // Item is true by default because ALL cost must be buyable

    if ((price * multiplicator) > this.player.resources.beers.qty) {
      buyable = false; // If not buyable, set variable to false
    }

    return buyable;
  }

  buy(item, multiplicator = 1): void { // multiplicator default value = 1 (same as if statement)
    this.player.resources.beers.qty -= (item.price * multiplicator);

    item.qty += multiplicator;

    if (item.category === this.config.breweries) {
      this.totalBreweriesAllTime += multiplicator;

      // send value to service
      this.BreweryService.setTotalBreweries(multiplicator);

      // send value of totalBeersAllTime to parent component (see @Output)
      this.totalBreweriesAllTimeChange.emit(this.totalBreweriesAllTime);

      // everytime we buy a brewery, we change income
      this.BreweryService.setIncome(this.player);
    }

    if (item.category === this.config.farms) {
      this.totalFarmsAllTime += multiplicator;

      // send value to service
      this.FarmService.setTotalFarms(multiplicator);

      // send value of totalFarmsAllTime to parent component (see @Output)
      this.totalFarmsAllTimeChange.emit(this.totalFarmsAllTime);

      // everytime we buy a farm, we change cereals' income
      this.FarmService.createCerealsIncome(this.player);
    }

    this.setNewPrice(item);
  }

  sell(item, multiplicator = 1): void {
    // If we have more item than we want to sell
    if (item.qty >= multiplicator) {
      // Remove multiplicator from the item
      item.qty -= multiplicator;

      // Add X% of the item cost, to the stock
      this.player.resources.beers.qty += (item.price * multiplicator) / 2;

      if (item.category === this.config.breweries) {
        // send value to service
        this.BreweryService.setSubstractTotalBreweries(multiplicator);

        // everytime we sell a brewery, we change income
        this.BreweryService.setIncome(this.player);
      }

      if (item.category === this.config.farms) {
        // send value to service
        this.FarmService.setSubstractTotalFarms(multiplicator);

        // everytime we sell a farm, we change income
        // TODO: check this
        this.BreweryService.setIncome(this.player);
      }

      this.setNewPrice(item);
    }
  }

  setNewPrice(item): void {
    // formula is : Price = baseCost * multiplier(^itemQuantity).
    item.price = item.baseCost * Math.pow(1.07, item.qty);

    if (item.price < item.baseCost) {
      item.price = item.baseCost;
    }

    item.price = Math.round((item.price * 100) / 100);

    this.PlayerService.updatePlayer(this.player);
  }
}
