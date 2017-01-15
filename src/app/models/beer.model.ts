import { Price } from "./price.model";

export class Beer {
  name: string;
  category: string;
  qty: number;
  price: Price[];
  ratio: number;
  unlocked: boolean;;
  seasonalEvent: boolean;
}
