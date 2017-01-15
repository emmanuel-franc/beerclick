import { Price } from "./price.model";

export class Consumable {
  name: string;
  category: string;
  qty: number;
  price?: Price[];
  unlocked: boolean;
  seasonalEvent: boolean;
}
