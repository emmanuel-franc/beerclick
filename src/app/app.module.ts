import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppConfigModule } from './app-config/app-config.module';
import { AppComponent } from './app.component';
import { ItemComponent } from './components/item/item.component';
import { EventComponent } from './components/event/event.component';

import { PlayerService } from './services/player/player.service';
import { EventService}  from './services/event/event.service';
import { PerkService } from './services/perk/perk.service';
import { BreweryService } from './services/brewery/brewery.service';
import { FarmService } from './services/farm/farm.service';

import { UpgradeComponent } from './components/upgrade/upgrade.component';
import { ClickZoneComponent } from './components/click-zone/click-zone.component';
import { PerkComponent } from './components/perk/perk.component';
import { PopinComponent } from './components/popin/popin.component';
import { ToLocalePipe } from './pipes/to-locale.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ItemComponent,
    EventComponent,
    UpgradeComponent,
    ClickZoneComponent,
    PerkComponent,
    PopinComponent,
    ToLocalePipe
  ],
  imports: [
    AppConfigModule,
    BrowserModule
  ],
  providers: [
    PlayerService,
    EventService,
    PerkService,
    BreweryService,
    FarmService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
