import { Component, Input, OnInit } from '@angular/core';

import {Player} from "../../models/player.model";
import {Perk} from "../../models/perk.model";

@Component({
  selector: 'app-perk',
  templateUrl: './perk.component.html',
  styleUrls: ['./perk.component.scss']
})
export class PerkComponent implements OnInit {
  @Input() player: Player;
  @Input() totalMoneyAllTime:number;
  perks: Perk[];

  constructor() {
    this.perks = [];
    this.totalMoneyAllTime = this.totalMoneyAllTime || 0;
  }

  ngOnInit() {
    this.perks = this.player.resources.perks;
console.log('this.player', this.player)

    //todo: appliquer la boucle lorsque totalmoneyalltime change
    for(let i = 0; i < this.perks.length; i++) {
      //unlock perkslot when limit is reached
      if(this.totalMoneyAllTime >= this.perks[i].limit) {
        this.player.resources.perks[i].unlocked = true;
        console.log('coucou')
      }
    }
  }
}
