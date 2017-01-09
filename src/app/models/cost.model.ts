import { Consumable } from "./consumable.model";

export class Cost {
  qty: number;
  type: Consumable;

  constructor(number, type) {
    number ? this.qty = number : '';
    type ? this.type = type : '';
  }
}
