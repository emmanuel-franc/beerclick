import {Component, Inject, Input, OnInit} from '@angular/core';
import {Player, Event} from '../../models';
import {PlayerService} from '../../services/player/player.service';
import {EventService} from '../../services/event/event.service';
import {BreweryService} from '../../services/brewery/brewery.service';

import { APP_CONFIG, AppConfig } from '../../app-config/app-config.module';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() player: Player;

  totalBreweries: number;
  chosenEvent: any;
  timeOut: any;
  eventList: any[];
  getEventsList: Event[];
  breweriesLossEvents: any[];
  beersLossEvents: any[];
  chosenEventQty: number;
  showEvent: boolean;

  constructor(public EventService: EventService,
              public BreweryService: BreweryService,
              public PlayerService: PlayerService,
              @Inject(APP_CONFIG) private config: AppConfig) {
    this.getEventsList = this.EventService.getEventsList();
    this.breweriesLossEvents = [];
    this.beersLossEvents = [];
    this.eventList = [];
    this.totalBreweries = 0;
    this.chosenEventQty = 0;
    this.showEvent = false;

    // subscribe to services to detect changes on eventsUnlocked array
    this.EventService.eventsUnlockedOnChange.subscribe(data => {
      return this.eventList = data;
    });

    // create array with all events that make loosing breweries
    this.breweriesLossEvents = this.getEventsList.filter(function(event){
        return event.action.lossType === config.breweries;
    });

    // create array with all events that make loosing beers
    this.beersLossEvents = this.getEventsList.filter(function(event){
      return event.action.lossType === config.beers;
    });

    // subscribe to services to detect changes on totalBreweries
    this.BreweryService.totalBreweriesOnChange.subscribe(data => {
      this.totalBreweries = data;

      for (let i = 0; i < this.breweriesLossEvents.length; i++) {
        // add events with brewery loss
        if (this.totalBreweries >= this.breweriesLossEvents[i].action.limit) {
          this.EventService.setEventUnlocked(this.breweriesLossEvents[i].id);
        }
        // remove events with brewery loss when limit -1 (to prevent event to never stop)
        if (this.totalBreweries < this.breweriesLossEvents[i].action.limit) {
          this.EventService.setEventLocked(this.breweriesLossEvents[i].id);
        }
      }
    });

    this.PlayerService.playerOnChange.subscribe(data => {
      for (let i = 0; i < this.beersLossEvents.length; i++) {
        // add events with brewery loss
        if (data.resources.beers.qty >= this.beersLossEvents[i].action.limit) {
          this.EventService.setEventUnlocked(this.beersLossEvents[i].id);
        }
        // remove events with brewery loss when limit -1 (to prevent event to never stop)
        if (data.resources.beers.qty < this.beersLossEvents[i].action.limit) {
          this.EventService.setEventLocked(this.beersLossEvents[i].id);
        }
      }
    });
  }

  ngOnInit() {
    this.randomEvent();
  }

  randomEvent() {
    let maxTime = this.config.maxTime; // 15 minutes or 5 min
    let minTime = this.config.minTime; // 10 minutes or 2 min
    let randomTime = Math.random() * (maxTime - minTime) + minTime;

    this.timeOut = setTimeout(() => {
      if (this.eventList.length) {
        // set mechanic of random appear of events
        this.chosenEvent = this.eventList[Math.floor(Math.random() * this.eventList.length)];

        // check if event has a loss amount
        if (this.chosenEvent.action.loss) {
          // check type of loss
          if (this.chosenEvent.action.lossType === this.config.breweries) {
            this.breweryLoss(this.chosenEvent);
          }

          if (this.chosenEvent.action.lossType === this.config.beers) {
            this.beersLoss(this.chosenEvent);
          }
        }

        // show event's text
        this.showEvent = true;

        // hide event's text after 10 second
        setTimeout(() => {
          this.showEvent = false;
        }, 10000);
      }
      this.randomEvent();
    }, randomTime);
  }

  breweryLoss(chosenEvent) {
    // get the number of breweries to remove
    this.chosenEventQty = Math.round(this.totalBreweries / chosenEvent.action.loss);

    // check if loss amount exceed totalBreweries amount
    if (this.chosenEventQty >= this.totalBreweries) {
      // set all Breweries qty to 0
      this.player.resources.breweries.forEach(function(brewery) {
        brewery.qty = 0;
      });

      this.totalBreweries = 0;
      // send value of totalBreweries to service
      this.BreweryService.resetTotalBreweries(this.player);
    } else {
      // get all Breweries with qty > 0.
      let breweriesWithQty = this.player.resources.breweries.filter(function(brewery){
        return brewery.qty > 0;
      });
  
      for (let i = 0; i < this.chosenEventQty; i++) {
        // get a random brewery
        let randomDestroyedBreweries = breweriesWithQty[Math.floor(Math.random() * breweriesWithQty.length)];
    
        // substract 1 brewery (because we are in a for loop)
        randomDestroyedBreweries.qty -= 1;
    
        // if current brewery quantity drops to 0, we remove it from the array then never loop on it again preventing a
        // negative value
        if (randomDestroyedBreweries.qty === 0) {
          breweriesWithQty.splice(breweriesWithQty.indexOf(randomDestroyedBreweries), 1);
        }

        this.PlayerService.setNewPrice(randomDestroyedBreweries);
      }
  
      // subtract chosenEventQty to totalBreweries then send value of totalBreweries to service
      this.BreweryService.setSubstractTotalBreweries(this.player, this.chosenEventQty);

      // everytime we remove a brewery, we change income
      this.BreweryService.createBeersIncome(this.player);
    }
  }

  beersLoss(chosenEvent) {
    // check if loss amount exceed beers.qty
    if (chosenEvent.action.loss >= this.player.resources.beers.qty) {
      this.chosenEventQty = this.player.resources.beers.qty;
      this.player.resources.beers.qty = 0;
    } else {
      this.chosenEventQty = chosenEvent.action.loss;
      // subtract this.chosenEvent.action.loss to beers.qty
      this.player.resources.beers.qty -= chosenEvent.action.loss;
    }
  }
}
