import { Component, Input, OnInit } from '@angular/core';

import {Player, PerkSlot, Perk, Price} from "../../models";

import {GlobalStatsService} from "../../services/globalStats/global-stats.service";
import {PerkService} from "../../services/perk/perk.service";

@Component({
  selector: 'app-perk',
  templateUrl: './perk.component.html',
  styleUrls: ['./perk.component.scss']
})
export class PerkComponent implements OnInit {
  @Input() player:Player;
  totalBeersAllTime:number;
  perkSlots:PerkSlot[];
  perksList:Perk[];
  popinIsVisible:boolean;
  perkSlotId:number;

  constructor(public GlobalStatsService:GlobalStatsService, public PerkService:PerkService) {
    this.perkSlots = [];
    this.perksList = [];
    this.popinIsVisible = false;

    //subscribe to services to detect changes on totalBeersAllTime
    this.GlobalStatsService.totalBeersAllTimeOnChange.subscribe(data => {

      this.totalBeersAllTime  = data;

      for(let i = 0; i < this.perkSlots.length; i++) {
        //unlock perkslot when limit is reached
        if(!this.player.resources.perkSlots[i].unlocked) {
          if(this.totalBeersAllTime >= this.perkSlots[i].limit) {
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

  removePerk(player, id) {
    this.PerkService.removeBonus(player, id);
  }
}
