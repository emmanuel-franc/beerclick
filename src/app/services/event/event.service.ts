import {Injectable, EventEmitter} from '@angular/core';
import {Event} from '../../models';

const json = require('../../../assets/data/events.json');

@Injectable()
export class EventService {
  public data: Event[];
  public eventsUnlocked: any;
  public eventsList: any;
  // see http://stackoverflow.com/questions/35878160/angular2-how-to-share-data-change-between-components
  public eventsUnlockedOnChange: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.eventsUnlocked = [];
    this.eventsList = json;
    this.data = [];
  }

  getEventsList() {
    // todo: initialize local storage here

    // Serialize JSON
    json.events.forEach((event) => {
      let newEvent = new Event(
        event.id,
        event.name,
        event.message,
        event.messageEndPart,
        event.action.loss,
        event.action.lossType,
        event.action.limit
      );
      this.data.push(newEvent);
    });

    return this.data;
  }

  setEventUnlocked(eventId) {
    let eventFound = this.eventsList.events.find(function(event){
      return event.id === eventId;
    });

    // check if eventFound isn't already in the array
    if (!this.eventsUnlocked.includes(eventFound)) {
      // push eventFound in new array then emit
      this.eventsUnlocked.push(eventFound);
      this.eventsUnlockedOnChange.emit(this.eventsUnlocked);
    }
  }

  setEventLocked(eventId) {
    let eventFound = this.eventsList.events.find(function(event){
      return event.id === eventId;
    });

    // check if eventFound is in the array
    if (!this.eventsUnlocked.includes(eventFound)) {
      // remove eventFound from it then emit
      this.eventsUnlocked.splice(this.eventsUnlocked.indexOf(eventFound), 1);
      this.eventsUnlockedOnChange.emit(this.eventsUnlocked);
    }
  }
}
