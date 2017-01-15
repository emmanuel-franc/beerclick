import { Price } from "./price.model";

export class Upgrade {
  name: string;
  category: string;
  price: Price[];
  purchased: boolean;
  seasonalEvent: boolean;
}
