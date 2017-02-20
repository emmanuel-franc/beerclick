import { Price } from "./price.model";

export class Farm {
  name: string;
  category: string;
  qty: number;
  price?: Price[];
  unlocked: boolean;
  seasonalEvent: boolean;
}
