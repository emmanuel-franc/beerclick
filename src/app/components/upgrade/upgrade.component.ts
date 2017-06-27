import {Component, Input} from '@angular/core';
import {Player} from '../../models/player.model';
import {PlayerService} from '../../services/player/player.service';
import {BreweryService} from '../../services/brewery/brewery.service';

@Component({
  selector: 'ng-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent {

  @Input() player: Player;
  private bitter;
  private stout;

  constructor(public PlayerService:PlayerService, public BreweryService:BreweryService) {
    this.bitter = this.BreweryService.incomeOnChange.subscribe(data => {
      if(data >= 1000) {
        let brewery = this.player.resources.upgrades.find(function(brewery){
          return brewery.name === 'Bitter Brewery';
        });

        if(!brewery.unlocked) {
          this.unlockUpgrade(brewery);
        }

        this.bitter.unsubscribe();
      }
    });

    this.stout = this.BreweryService.incomeOnChange.subscribe(data => {
      // Unlock brewery
      if(data > 10000) {
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
    this.PlayerService.updatePlayer(this.player);
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

      if (item.category === 'farms') {
        let unlock = this.player.resources.farms.find(function(element){
          return element.name === item.name;
        });

        unlock.unlocked = true;
      }

      if (item.category === 'breweries') {
        let unlock = this.player.resources.breweries.find(function(element){
          return element.name === item.name;
        });

        unlock.unlocked = true;
      }
    }
  }
}
