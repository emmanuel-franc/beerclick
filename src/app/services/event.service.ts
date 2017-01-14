import { Injectable, EventEmitter } from '@angular/core';
import {Event} from '../models';

import * as _ from "lodash";

const json = require("../../assets/data/events.json");

@Injectable()
export class EventService {
  public data:Event[];
  public eventsUnlocked:any[];
  public eventsList:any;
  public eventsUnlockedOnChange:EventEmitter<any> = new EventEmitter(); //see http://stackoverflow.com/questions/35878160/angular2-how-to-share-data-change-between-components
  
  constructor() {
    this.eventsUnlocked = [];
    this.eventsList = json;
    this.data = [];
  }
  
  getEventsList() {
    //todo: initialize local storage here
    
    //serialize JSON
    json.events.forEach((event) => {
      let newEvent = new Event(event.id, event.name, event.message, event.messageEndPart, event.action.loss, event.action.lossType, event.action.limit);
      this.data.push(newEvent);
      console.log('service this.data',this.data);
    });

    return this.data;
  }
  
  setEventUnlocked(eventId) {
    let eventFound = _.find(this.eventsList.events, ['id', eventId]);

    //check if eventFound isn't already in the array
    if(!_.includes(this.eventsUnlocked, eventFound)) {
      //push eventFound in new array then emit
      this.eventsUnlocked.push(eventFound);
      this.eventsUnlockedOnChange.emit(this.eventsUnlocked);
    }
  }
  
  setEventLocked(eventId) {
    let eventFound = _.find(this.eventsList.events, ['id', eventId]);

    //check if eventFound is in the array
    if(_.includes(this.eventsUnlocked, eventFound)) {
      //remove eventFound from it then emit
      this.eventsUnlocked.splice(this.eventsUnlocked.indexOf(eventFound), 1);
      this.eventsUnlockedOnChange.emit(this.eventsUnlocked);
    }
  }
}
