import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../../models';
import {PlayerService} from '../../services/player/player.service';

@Component({
  selector: 'app-click-zone',
  templateUrl: './click-zone.component.html',
  styleUrls: ['./click-zone.component.scss']
})
export class ClickZoneComponent {

  @Input() player:Player;
  @Input() totalBeersAllTime:number;
  generatedBeers:number;
  clicks:number[];
  
  constructor(public PlayerService:PlayerService) {
    //default beers generated is equal to 1
    this.generatedBeers = 1;
    this.clicks = [];


    this.PlayerService.totalBeersAllTimeOnChange.subscribe(data => {
      this.totalBeersAllTime = data;
    });
  }

  generateBeers(){
    //add to a percentage of players's current income to player's beers
    this.generatedBeers = Math.round((this.player.resources.beers.qty * 1) / 100);
    
    //if beers generated is inferior at 1 set beers generated to 1
    if(this.generatedBeers < 1) {
      this.generatedBeers = 1;
    }

    //increment beers quantity
    this.player.resources.beers.qty +=  this.generatedBeers;

    //increment totalBeersAllTime quantity
    this.PlayerService.setTotalBeersAllTime(this.generatedBeers);

    //show value generated
    this.clicks.push(this.generatedBeers);

    //hide value after 1 second
    setTimeout(() => {
      this.clicks.splice(0, 1);
    }, 1000);
  }
}
