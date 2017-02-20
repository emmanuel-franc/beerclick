import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ItemComponent } from './components/item/item.component';
import { EventComponent } from './components/event/event.component';

import { PlayerService } from "./services/player/player.service";
import { EventService}  from "./services/event/event.service";
import { GlobalStatsService}  from "./services/globalStats/global-stats.service";
import { PerkService } from "./services/perk/perk.service";
import { BreweryService } from "./services/brewery/brewery.service";
import { FarmService } from "./services/farm/farm.service";

import { UpgradeComponent } from './components/upgrade/upgrade.component';
import { ClickZoneComponent } from './components/click-zone/click-zone.component';
import { PerkComponent } from './components/perk/perk.component';
import { PopinComponent } from './components/popin/popin.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    EventComponent,
    UpgradeComponent,
    ClickZoneComponent,
    PerkComponent,
    PopinComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    PlayerService,
    EventService,
    GlobalStatsService,
    PerkService,
    BreweryService,
    FarmService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
