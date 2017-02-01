import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Player, Perk} from "../../models";
import { PerkService} from '../../services/perk/perk.service';

@Component({
  selector: 'app-popin',
  templateUrl: './popin.component.html',
  styleUrls: ['./popin.component.scss']
})
export class PopinComponent {

  @Input() player: Player;
  @Input() perkSlotId:number;
  @Input() popinIsVisible: boolean;
  @Output() popinIsVisibleChange = new EventEmitter<boolean>();

  constructor(public PerkService:PerkService) {
  }

  isBuyable(item): boolean {
    let buyable = true; // Item is true by default because ALL cost must be buyable

    if(item.price[0].qty > item.price[0].consumable.qty) {
      buyable = false; // If not buyable, set variable to false
    }

    return buyable;
  }

  setPerk(item) {
    if(this.isBuyable(item)) {
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
