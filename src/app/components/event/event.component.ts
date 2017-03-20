import { Component, Input, OnInit } from '@angular/core';
import {Player, Event} from '../../models';
import {EventService} from "../../services/event/event.service";
import {BreweryService} from "../../services/brewery/brewery.service";

import * as _ from "lodash";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() player: Player;
  @Input() standBy: boolean;

  totalBreweries: number;
  chosenEvent:any;
  timeOut:any;
  eventList: any[];
  getEventsList:Event[];
  breweriesLossEvents:any[];
  chosenEventQty:number;
  
  constructor(public EventService:EventService, public BreweryService:BreweryService) {
    this.getEventsList = this.EventService.getEventsList();
    this.breweriesLossEvents = [];
    this.eventList = [];
    this.totalBreweries = 0;
    this.chosenEventQty = 0;
  
    //subscribe to services to detect changes on eventsUnlocked array
    this.EventService.eventsUnlockedOnChange.subscribe(data => {
      return this.eventList = data;
    });
  
    //create array with all events that make loosing breweries
    this.breweriesLossEvents = _.filter(this.getEventsList, function(event) {
      return event.action.lossType === "breweries";
    });
    
    //subscribe to services to detect changes on totalBreweries
    this.BreweryService.totalBreweriesOnChange.subscribe(data => {
      this.totalBreweries = data;

      for(let i = 0; i < this.breweriesLossEvents.length; i++) {
        //add events with brewery loss
        if(this.totalBreweries >= this.breweriesLossEvents[i].action.limit) {
          this.EventService.setEventUnlocked(this.breweriesLossEvents[i].id);
        }
        //remove events with brewery loss when limit -1 (to prevent event to never stop)
        if(this.totalBreweries < this.breweriesLossEvents[i].action.limit) {
          this.EventService.setEventLocked(this.breweriesLossEvents[i].id);
        }
      }
    });
  }
  
  ngOnInit() {
    if(this.standBy){
      this.randomEvent();
    }
  }
  
  randomEvent() {
    let maxTime = 1000; // 5 minutes
    let minTime = 800; // 1 minute
    let randomTime = Math.random() * (maxTime - minTime) + minTime;
    
    this.timeOut = setTimeout(() => {
      if(this.eventList.length) {
        //set mechanic of random appear of events
        this.chosenEvent = this.eventList[Math.floor(Math.random()*this.eventList.length)];
    
        //check if event has a loss amount
        if(this.chosenEvent.action.loss) {
          //check type of loss
          if(this.chosenEvent.action.lossType === "breweries") {
            this.breweryLoss(this.chosenEvent);
          }
  
          if(this.chosenEvent.action.lossType === "beers") {
            this.beersLoss(this.chosenEvent);
          }
        }
      }
      this.randomEvent();
    }, randomTime)
  }

  breweryLoss(chosenEvent) {
    //get the number of breweries to remove
    this.chosenEventQty = Math.round(this.totalBreweries / chosenEvent.action.loss);
    
    //check if loss amount exceed totalBreweries amount
    if(this.chosenEventQty >= this.totalBreweries) {
      //set all Breweries qty to 0
      _.forEach(this.player.resources.breweries, function(brewery){
        brewery.qty = 0;
      });

      this.totalBreweries = 0;
      //send value of totalBreweries to service
      this.BreweryService.resetTotalBreweries();
    } else {
      //get all Breweries with qty > 0. _.filter creates a new array (see lodash documentation for _.filter)
      let breweriesWithQty = _.filter(this.player.resources.breweries, function(brewery){
        return brewery.qty > 0
      });

      for(let i =0; i < this.chosenEventQty; i++) {
        //get a random brewery
        let randomDestroyedBreweries = breweriesWithQty[Math.floor(Math.random()*breweriesWithQty.length)]

        //substract 1 brewery (because we are in a for loop)
        randomDestroyedBreweries.qty -= 1;

        //if current brewery quantity drops to 0, we remove it from the array then never loop on it again preventing a
        // negative value
        if(randomDestroyedBreweries.qty === 0) {
          breweriesWithQty.splice(breweriesWithQty.indexOf(randomDestroyedBreweries), 1);
        }
      }

      //subtract chosenEventQty to totalBreweries then send value of totalBreweries to service
      this.BreweryService.setSubstractTotalBreweries(this.chosenEventQty);

      //everytime we remove a brewery, we change income
      this.BreweryService.setIncome(this.player);
    }
  }

  beersLoss(chosenEvent) {
    //check if loss amount exceed beers.qty
    if(chosenEvent.action.loss >= this.player.resources.beers.qty) {
      this.player.resources.beers.qty = 0;
    } else {
      //subtract this.chosenEvent.action.loss to beers.qty
      this.player.resources.beers.qty -= chosenEvent.action.loss;
    }
  }
}
