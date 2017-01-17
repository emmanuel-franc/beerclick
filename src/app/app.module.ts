import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ItemComponent } from './components/item/item.component';
import { EventComponent } from './components/event/event.component';

import {EventService} from "./services/event/event.service";
import {GlobalStatsService} from "./services/globalStats/global-stats.service";
import { UpgradeComponent } from './components/upgrade/upgrade.component';
import { ClickZoneComponent } from './components/click-zone/click-zone.component';
import { PerkComponent } from './components/perk/perk.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    EventComponent,
    UpgradeComponent,
    ClickZoneComponent,
    PerkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    EventService,
    GlobalStatsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
