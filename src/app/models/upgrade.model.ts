import { Price } from "./price.model";

export class Upgrade {
  name: string;
  category: string;
  price: Price[];
  unlocked: boolean;
  purchased: boolean;
  seasonalEvent: boolean;
}
