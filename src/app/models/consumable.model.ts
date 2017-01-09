import { Cost } from "./cost.model";

export class Consumable {
  name: string;
  qty: number;
  cost?: [Cost];
}
