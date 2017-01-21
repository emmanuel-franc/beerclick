import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player, Perk} from "../../models";

@Component({
  selector: 'app-popin',
  templateUrl: './popin.component.html',
  styleUrls: ['./popin.component.scss']
})
export class PopinComponent implements OnInit {

  @Input() player: Player;
  @Input() perkSlotId:number;
  @Input() popinIsVisible: boolean;
  @Output() popinIsVisibleChange = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  setPerk(item) {
    //set item to purchased
    item.purchased = true;
    //set money of player minus item's price
    item.price[0].consumable.qty -= item.price[0].qty;
    //set price of item to 0 because it has been bought. We want it to be clickable in the futur to be set to slot without any cost
    item.price[0].qty = 0;
    //add item to perkSlot with id returned by perkSlotId
    this.player.resources.perkSlots[this.perkSlotId].assignedPerk = item;

    this.popinIsVisible = false;
    this.popinIsVisibleChange.emit(this.popinIsVisible);
  }
}
