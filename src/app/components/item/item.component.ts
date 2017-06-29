import {Component, Inject, Input} from '@angular/core';

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

  constructor(public PlayerService: PlayerService,
              public BreweryService: BreweryService,
              public FarmService: FarmService,
              @Inject(APP_CONFIG) private config: AppConfig) {
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
      // send value to service
      this.BreweryService.setTotalBreweries(this.player, multiplicator);

      // everytime we buy a brewery, we change income
      this.BreweryService.createBeersIncome(this.player);
    }

    if (item.category === this.config.farms) {
      // send value to service
      this.FarmService.setTotalFarms(this.player, multiplicator);

      // everytime we buy a farm, we change cereals' income
      this.FarmService.createCerealsIncome(this.player);
    }
  
    this.PlayerService.setNewPrice(item);
    this.PlayerService.updatePlayer(this.player);
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
        this.BreweryService.setSubstractTotalBreweries(this.player, multiplicator);

        // everytime we sell a brewery, we change income
        this.BreweryService.createBeersIncome(this.player);
      }

      if (item.category === this.config.farms) {
        // send value to service
        this.FarmService.setSubstractTotalFarms(this.player, multiplicator);

        // everytime we sell a farm, we change income
        // TODO: check this
        this.BreweryService.createBeersIncome(this.player);
      }
  
      this.PlayerService.setNewPrice(item);
      this.PlayerService.updatePlayer(this.player);
    }
  }
}
