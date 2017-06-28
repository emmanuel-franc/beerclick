import {Component, Inject, Input, Output, EventEmitter} from '@angular/core';

import { APP_CONFIG, AppConfig } from '../../app-config/app-config.module';

import {Player} from '../../models';
import {PerkService} from '../../services/perk/perk.service';

@Component({
  selector: 'app-popin',
  templateUrl: './popin.component.html',
  styleUrls: ['./popin.component.scss']
})
export class PopinComponent {

  @Input() player: Player;
  @Input() perkSlotId: number;
  @Input() popinIsVisible: boolean;
  @Output() popinIsVisibleChange = new EventEmitter<boolean>();

  constructor(public PerkService: PerkService,
              @Inject(APP_CONFIG) private config: AppConfig) {
  }

  isBuyable(item): boolean {
    // Item is true by default because ALL cost must be buyable
    let buyable = true;

    if (item.price > this.player.resources.beers.qty) {
      // If not buyable, set variable to false
      buyable = false;
    }

    return buyable;
  }

  setPerk(item) {
    if (this.isBuyable(item)) {
      this.PerkService.setPerk(item, this.player, this.perkSlotId);

      this.popinIsVisible = false;
      this.popinIsVisibleChange.emit(this.popinIsVisible);
    }
  }

  closePopin() {
    this.popinIsVisible = false;
    this.popinIsVisibleChange.emit(this.popinIsVisible);
  }
}
