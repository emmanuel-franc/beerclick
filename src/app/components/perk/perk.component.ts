import { Component, Input, OnInit } from '@angular/core';

import {Player} from "../../models/player.model";
import {Perk} from "../../models/perk.model";

import {GlobalStatsService} from "../../services/globalStats/global-stats.service";

@Component({
  selector: 'app-perk',
  templateUrl: './perk.component.html',
  styleUrls: ['./perk.component.scss']
})
export class PerkComponent implements OnInit {
  @Input() player: Player;
  totalMoneyAllTime:number;
  perks: Perk[];

  constructor(public GlobalStatsService:GlobalStatsService) {
    this.perks = [];

    //subscribe to services to detect changes on totalBeers
    this.GlobalStatsService.totalMoneyAllTimeOnChange.subscribe(data => {

      this.totalMoneyAllTime  = data;

      for(let i = 0; i < this.perks.length; i++) {
        //unlock perkslot when limit is reached
        if(!this.player.resources.perks[i].unlocked) {
          if(this.totalMoneyAllTime >= this.perks[i].limit) {
            this.player.resources.perks[i].unlocked = true;
          }
        }
      }
    });
  }

  ngOnInit() {
    this.perks = this.player.resources.perks;
  }

  addPerk() {
    //Todo: create popin (or other) to add a perk
    prompt('Chose a perk');
  }
}
