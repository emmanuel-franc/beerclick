import { Price } from "./price.model";

export class Farm {
  name: string;
  category: string;
  qty: number;
  price?: Price[];
  bank: any;
  unlocked: boolean;
  seasonalEvent: boolean;
}
