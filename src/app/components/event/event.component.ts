import { Component, Input, OnInit } from '@angular/core';
import {Consumable } from '../../models';
import {EventService} from "../../services/event.service";

//const eventsList = require("../../../assets/data/events.json");

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  
  @Input() bank: Consumable;
  
  chosenEvent:any;
  timeOut:any;
  eventList: any[];
  
  constructor(public EventService:EventService) {
    this.eventList = [];
  
    this.eventList = this.EventService.getEventsUnlocked();
    this.EventService.init();
  }
  
  ngOnInit() {
    this.randomEvent();
  }
  
  //unlockEvent() {
    //set unlocked true on each item when unlock condition is reached
  //   eventsList.events.forEach((event) => {
  //     if(event.unlock === this.bank.qty) {
  //       event.unlocked = true;
  //       this.unblockedArray.push(event);
  //     }
  //   });
  // }
  
  
  
  randomEvent() {
    this.eventList = this.EventService.getEventsUnlocked();

    console.log('eventlist',this.eventList)

    let maxTime = 3000; // 5 minutes
    let minTime = 1000; // 1 minute
    let randomTime = Math.random() * (maxTime - minTime) + minTime;
    
    this.timeOut = setTimeout(() => {
      //set mechanic of random appear of events
      this.chosenEvent = this.eventList[Math.floor(Math.random()*this.eventList.length)];
      
      if(this.chosenEvent.action.loss) {
      
      }
      
      this.randomEvent();
    }, randomTime)
  }
}
