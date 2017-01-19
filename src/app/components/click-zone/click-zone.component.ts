import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Player } from '../../models';

@Component({
  selector: 'app-click-zone',
  templateUrl: './click-zone.component.html',
  styleUrls: ['./click-zone.component.scss']
})
export class ClickZoneComponent {

  @Input() player:Player;
  @Input() totalMoneyAllTime:number;
  @Output() totalMoneyAllTimeChange = new EventEmitter<number>();
  generatedMoney:number;
  clicks:number[];
  
  constructor() {
    //default money generated is equal to 1
    this.generatedMoney = 1;
    this.clicks = [];

    this.totalMoneyAllTime = this.totalMoneyAllTime || 0;
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

    //increment totalMoneyAllTime quantity
    this.totalMoneyAllTime += this.generatedMoney;
    this.totalMoneyAllTimeChange.emit(this.totalMoneyAllTime);

    //show value generated
    this.clicks.push(this.generatedMoney);

    //hide value after 1 second
    setTimeout(() => {
      this.clicks.splice(0, 1);
    }, 1000);
  }
}
