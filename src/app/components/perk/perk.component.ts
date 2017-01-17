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
  perks: Perk[];
  perksArrayLeft: Perk[];
  perksArrayRight: Perk[];

  constructor() {
    this.perks = [];
    this.perksArrayLeft = [];
    this.perksArrayRight = []
  }

  ngOnInit() {
    this.perks = this.player.resources.perks;
  }
}
