import { Consumable } from "./consumable.model";

export class Price {
  qty: number;
  consumable: Consumable;

  constructor(number, consumable) {
    number ? this.qty = number : '';
    consumable ? this.consumable = consumable : '';
  }
}
