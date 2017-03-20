import { Price } from "./price.model";

export class Brewery {
  name: string;
  category: string;
  qty: number;
  price: Price[];
  productionCost: Price[];
  ratio: number;
  unlocked: boolean;
  seasonalEvent: boolean;
}
