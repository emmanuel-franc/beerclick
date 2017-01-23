import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Player, Perk} from "../../models";
import { PerkService} from '../../services/perk/perk.service';

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

  constructor(public PerkService:PerkService) {
  }

  ngOnInit() {
  }

  setPerk(item) {
    this.PerkService.setPerk(item, this.player, this.perkSlotId);

    this.popinIsVisible = false;
    this.popinIsVisibleChange.emit(this.popinIsVisible);
  }

  closePopin() {
    this.popinIsVisible = false;
    this.popinIsVisibleChange.emit(this.popinIsVisible);
  }
}
