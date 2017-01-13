import { Injectable } from '@angular/core';

import * as _ from "lodash";

const data = require("../../assets/data/events.json");

@Injectable()
export class EventService {
  public eventsIdUnlocked:number[];
  public eventsUnlocked:any[];
  public callbacks:Function[];
  public eventsList:any;
  
  constructor() {
    this.callbacks = [];
    this.eventsIdUnlocked = [];
    this.eventsUnlocked = [];
    this.eventsList = undefined;
  }

  init() {
    //todo: initialize local storage here
    this.eventsList = data;
  }
  
  eventUnlocked(eventId) {
    if(!_.includes(this.eventsIdUnlocked, eventId)){
      this.eventsIdUnlocked.push(eventId);
      console.log('in event unlocked')
    }
  }

  getEventsList() {
    return this.eventsList;
  }
  
  getEventsUnlocked() : any {
    for(let i = 0; i < this.eventsIdUnlocked.length; i++) {
      let eventFound = _.find(this.eventsList.events, ['id', i]);
      
      if(!_.includes(this.eventsUnlocked, eventFound)) {
        this.eventsUnlocked.push(eventFound);
      }
    }

   return this.eventsUnlocked;
  }

  onEventChange(callback:Function) : Function {
    this.callbacks.push(callback);
    return () => this.callbacks.splice(this.callbacks.indexOf(callback), 1);
  }
}
