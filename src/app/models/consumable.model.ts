import { Price } from "./price.model";

export class Consumable {
  name: string;
  qty: number;
  type: string;
  price?: [Price];
}
