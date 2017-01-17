import { Component, Input, OnInit } from '@angular/core';

import {Player} from "../../models/player.model";
import {Perk} from "../../models/perk.model";

//import * as _ from "lodash";

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
    console.log('PERKSPERKS', this.perks)
  }
}
