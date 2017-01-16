import { Component, Input, OnInit } from '@angular/core';
import {Player, Event} from '../../models';
import {EventService} from "../../services/event.service";
import {GlobalStatsService} from "../../services/globalStats/global-stats.service";

import * as _ from "lodash";

//const eventsList = require("../../../assets/data/events.json");

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  @Input() player: Player;
  
  totalBeers: number;
  chosenEvent:any;
  timeOut:any;
  eventList: any[];
  getEventsList:Event[];
  beersLossEvents:any[];
  
  constructor(public EventService:EventService, public GlobalStatsService:GlobalStatsService) {
    this.getEventsList = this.EventService.getEventsList();
    this.beersLossEvents = [];
    this.eventList = [];
    this.totalBeers = 0;
  
    //subscribe to services to detect changes on eventsUnlocked array
    this.EventService.eventsUnlockedOnChange.subscribe(data => {
      return this.eventList = data;
    });
  
    //create array with all events that make loosing beers
    this.beersLossEvents = _.filter(this.getEventsList, function(event) {
      return event.action.lossType === "beers";
    });
    
    //subscribe to services to detect changes on totalBeers
    this.GlobalStatsService.totalBeersOnChange.subscribe(data => {
      this.totalBeers = data;

      for(let i = 0; i < this.beersLossEvents.length; i++) {
        //add events with beer loss
        if(this.totalBeers === this.beersLossEvents[i].action.limit) {
          this.EventService.setEventUnlocked(this.beersLossEvents[i].id);
        }
        //remove events with beer loss when limit -1 (to prevent event to never stop)
        if(this.totalBeers === this.beersLossEvents[i].action.limit - 1) {
          this.EventService.setEventLocked(this.beersLossEvents[i].id);
        }
      }
    });
  }
  
  ngOnInit() {
    this.randomEvent();
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
          if(this.chosenEvent.action.lossType === "beers") {
            this.beerLoss(this.chosenEvent);
          }
  
          if(this.chosenEvent.action.lossType === "money") {
            this.moneyLoss(this.chosenEvent);
          }
        }
      }
      this.randomEvent();
    }, randomTime)
  }

  //TODO: optimize beerloss() and moneyloss(). Try to refactor both functions into one
  
  beerLoss(chosenEvent) {
    //check if loss amount exceed totalBeers amount
    if(chosenEvent.action.loss >= this.totalBeers) {
      //set all beers qty to 0
      _.forEach(this.player.resources.beers, function(beer){
        beer.qty = 0;
      });

      this.totalBeers = 0;
      //send value of totalBeers to service
      this.GlobalStatsService.setTotalBeers(this.totalBeers);
    } else {
      //get all beers with qty > 0. _.filter creates a new array
      let beersWithQty = _.filter(this.player.resources.beers, function(beer){
        return beer.qty > 0
      });

      //get a random beer and subtract this.chosenEvent.action.loss
      let randomBrokenBeers = beersWithQty[Math.floor(Math.random()*beersWithQty.length)]
      randomBrokenBeers.qty -= chosenEvent.action.loss;
  
      //subtract this.chosenEvent.action.loss to totalBeers then send value of totalBeers to service
      this.GlobalStatsService.setSubstractTotalBeers(chosenEvent.action.loss);
    }
  }

  moneyLoss(chosenEvent) {
    //check if loss amount exceed money.qty
    if(chosenEvent.action.loss >= this.player.resources.money.qty) {
      this.player.resources.money.qty = 0;
    } else {
      //subtract this.chosenEvent.action.loss to money.qty
      this.player.resources.money.qty -= chosenEvent.action.loss;
    }
  }
}
