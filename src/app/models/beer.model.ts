import { Price } from "./price.model";

export class Beer {
  name: string;
  qty: number;
  type: string;
  price: [Price];
  ratio: number;
}
