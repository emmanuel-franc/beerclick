import { Component, Input } from '@angular/core';
import { Player } from '../../models';

@Component({
  selector: 'app-click-zone',
  templateUrl: './click-zone.component.html',
  styleUrls: ['./click-zone.component.scss']
})
export class ClickZoneComponent {

  @Input() player:Player;
  generatedMoney:number;
  clicks:number[];
  
  constructor() {
    //default money generated is equal to 1
    this.generatedMoney = 1;
    this.clicks = [];
  }

  generateMoney(){
    //add to a percentage of players's current income to player's money
    this.generatedMoney = Math.round((this.player.resources.income * 1) / 100);
    
    //if money generated is inferior at 1 set money generated to 1
    if(this.generatedMoney < 1) {
      this.generatedMoney = 1;
    }

    //increment money quantity
    this.player.resources.money.qty +=  this.generatedMoney;

    //show value generated
    this.clicks.push(this.generatedMoney);

    //hide value after 1 second
    setTimeout(() => {
      this.clicks.splice(0, 1);
    }, 1000);
  }
}
