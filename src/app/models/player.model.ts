import { Consumable } from "./consumable.model";
import { Beer } from "./beer.model";

export class Player {
  ressources: {
    money: Consumable;
    consumables: [Consumable],
    beers: [Beer]
  };
}
