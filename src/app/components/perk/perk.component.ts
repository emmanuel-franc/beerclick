import { Component, Input, OnInit } from '@angular/core';

import {Player, PerkSlot, Perk, Price} from "../../models";

import {GlobalStatsService} from "../../services/globalStats/global-stats.service";

@Component({
  selector: 'app-perk',
  templateUrl: './perk.component.html',
  styleUrls: ['./perk.component.scss']
})
export class PerkComponent implements OnInit {
  @Input() player:Player;
  totalMoneyAllTime:number;
  perkSlots:PerkSlot[];
  perksList:Perk[];
  popinIsVisible:boolean;
  perkSlotId:number;

  constructor(public GlobalStatsService:GlobalStatsService) {
    this.perkSlots = [];
    this.perksList = [];
    this.popinIsVisible = false;

    //subscribe to services to detect changes on totalBeers
    this.GlobalStatsService.totalMoneyAllTimeOnChange.subscribe(data => {

      this.totalMoneyAllTime  = data;

      for(let i = 0; i < this.perkSlots.length; i++) {
        //unlock perkslot when limit is reached
        if(!this.player.resources.perkSlots[i].unlocked) {
          if(this.totalMoneyAllTime >= this.perkSlots[i].limit) {
            this.player.resources.perkSlots[i].unlocked = true;
          }
        }
      }
    });
  }

  ngOnInit() {
    this.perkSlots = this.player.resources.perkSlots;
    this.perksList = this.player.resources.perks;
  }

  addPerk(id) {
    this.popinIsVisible = true;
    this.perkSlotId = id;
  }
}
