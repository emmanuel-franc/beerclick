import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'beer-click works!'
  interval:any;
  bank:number;
  
  //beers types
  pill:number;
  lagger:number;
  stout:number;
  
  //ingredient types
  malt:number;
  houblon:number;
  
  constructor() {
    console.info('Beerclick Component Mounted Successfully');
    this.bank = 100;
    
    //beers types
    this.pill = 0;
    this.lagger = 0;
    this.stout = 0;
    
    //ingredient types
    this.houblon = 0;
    this.malt = 0;
    
    //each seconds, calculateBank
    this.interval = setInterval(() => {this.calculateBank();}, 1000) //use arrow function to point to the class when called. See: http://stackoverflow.com/questions/35828830/angular-2-call-setinterval-undefined-services-form-dependency-injection
  }
  
  calculateBank(){
    this.bank = this.bank + 1 + this.pill + this.lagger * 2 + this.stout * 3;
  }
  
  increment(item, multiplicatorValue) {
    let multiplicator = multiplicatorValue;
    
    if(!multiplicatorValue) {
      multiplicator = 1;
    }
    
    if(item === "malt") {
      this.bank = this.bank - (10 * multiplicator);
      this.malt = this.malt + (1 * multiplicator);
    }
    
    if(item === "houblon") {
      this.bank = this.bank - (10 * multiplicator);
      this.houblon = this.houblon + (1 * multiplicator);
    }
    
    if(item === "pill") {
      this.bank = this.bank - (5 * multiplicator);
      this.houblon = this.houblon - (1 * multiplicator);
      this.pill = this.pill + (1 * multiplicator);
    }
    
    if(item === "lagger") {
      this.bank = this.bank - (10 * multiplicator);
      this.houblon = this.houblon - (1 * multiplicator);
      this.lagger = this.lagger + (1 * multiplicator);
    }
    
    if(item === "stout") {
      this.bank = this.bank - (20 * multiplicator);
      this.houblon = this.houblon - (1 * multiplicator);
      this.malt = this.malt - (1 * multiplicator);
      this.stout = this.stout + (1 * multiplicator);
    }
  }
  
  decrement(item) {
    if(item === "malt") {
      this.bank = this.bank + 10;
      this.malt--
    }
    
    if(item === "houblon") {
      this.bank = this.bank + 10;
      this.houblon--
    }
    
    if(item === "pill") {
      this.bank = this.bank + 5;
      this.pill--
    }
    
    if(item === "lagger") {
      this.bank = this.bank + 10;
      this.lagger--
    }
    
    if(item === "stout") {
      this.bank = this.bank + 20;
      this.stout--
    }
  }
  
  stopIncrement() {
    clearInterval(this.interval);
  }
}
