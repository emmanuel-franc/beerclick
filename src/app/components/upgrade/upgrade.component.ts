import { Component, OnInit, Input } from '@angular/core';
import {Player} from "../../models/player.model";

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit {
  
  @Input() player: Player;
  
  constructor() {
  
  }

  ngOnInit() {
    console.log('player', this.player)
  }

  test() {
  
  }
}
