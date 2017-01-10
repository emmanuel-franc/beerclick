import { Consumable } from "./consumable.model";

export class Price {
  qty: number;
  type: Consumable;

  constructor(number, type) {
    number ? this.qty = number : '';
    type ? this.type = type : '';
  }
}
