import {Component, Inject, Input, OnInit} from '@angular/core';

import { APP_CONFIG, AppConfig } from '../../app-config/app-config.module';

import {Player, PerkSlot, Perk} from '../../models';

import {PlayerService} from '../../services/player/player.service';
import {PerkService} from '../../services/perk/perk.service';

@Component({
  selector: 'app-perk',
  templateUrl: './perk.component.html',
  styleUrls: ['./perk.component.scss']
})
export class PerkComponent implements OnInit {
  @Input() player: Player;
  totalBeersAllTime: number;
  perkSlots: PerkSlot[];
  perksList: Perk[];
  popinIsVisible: boolean;
  perkSlotId: number;

  constructor(public PlayerService: PlayerService,
              public PerkService: PerkService,
              @Inject(APP_CONFIG) private config: AppConfig) {
    this.perkSlots = [];
    this.perksList = [];
    this.popinIsVisible = false;

    // subscribe to services to detect changes on totalBeersAllTime
    this.PlayerService.playerOnChange.subscribe(data => {
      this.totalBeersAllTime = data.resources.totalBeersAllTime;

      for (let i = 0; i < this.perkSlots.length; i++) {
        // unlock perkslot when limit is reached
        if (!this.player.resources.perkSlots[i].unlocked) {
          if (this.totalBeersAllTime >= this.perkSlots[i].limit) {
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
