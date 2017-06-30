import {Component, Inject, Input} from '@angular/core';

import { APP_CONFIG, AppConfig } from '../../app-config/app-config.module';

import {Player} from '../../models/player.model';
import {PlayerService} from '../../services/player/player.service';
import {BreweryService} from '../../services/brewery/brewery.service';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent {

  @Input() player: Player;
  private bitter;
  private stout;

  constructor(public PlayerService:PlayerService,
              public BreweryService:BreweryService,
              @Inject(APP_CONFIG) private config: AppConfig) {
    this.bitter = this.PlayerService.playerOnChange.subscribe(data => {
      if(data.resources.beers.qty >= 1000) {
        let brewery = this.player.resources.upgrades.find(function(brewery){
          return brewery.name === 'Bitter Brewery';
        });

        if(!brewery.unlocked) {
          this.unlockUpgrade(brewery);
        }

        this.bitter.unsubscribe();
      }
    });

    this.stout = this.PlayerService.playerOnChange.subscribe(data => {
      // Unlock brewery
      if(data.resources.beers.qty > 10000) {
        let brewery = this.player.resources.upgrades.find(function(brewery){
          return brewery.name === 'Dry Stout Brewery';
        });

        let farm = this.player.resources.upgrades.find(function(brewery){
          return brewery.name === 'Barley';
        });

        if(!brewery.unlocked) {
          this.unlockUpgrade(brewery);
        }

        if(!farm.unlocked) {
          this.unlockUpgrade(farm);
        }

        this.stout.unsubscribe();
      }
    });
  }

  unlockUpgrade(upgrade): void {
    upgrade.unlocked = true;
  }

  isBuyable(item): boolean {
    let buyable = true;

    if (item.price > this.player.resources.beers.qty) {
      buyable = false;
    }

    return buyable;
  }

  buyUpgrade(item): void {
    if (this.isBuyable(item)) {
      // substract to player's beers qty the price
      this.player.resources.beers.qty -= item.price;

      // set unlock on this upgrade
      let purchase = this.player.resources.upgrades.find(function(element){
        return element.name === item.name;
      });

      purchase.purchased = true;

      if (item.category === this.config.farms) {
        let unlock = this.player.resources.farms.find(function(element){
          return element.name === item.name;
        });

        unlock.unlocked = true;
      }

      if (item.category === this.config.breweries) {
        let unlock = this.player.resources.breweries.find(function(element){
          return element.name === item.name;
        });

        unlock.unlocked = true;
      }
    }
  }
}
