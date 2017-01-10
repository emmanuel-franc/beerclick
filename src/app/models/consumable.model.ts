import { Price } from "./price.model";

export class Consumable {
  name: string;
  qty: number;
  category: string;
  price?: [Price];
  unlocked: boolean;
}
