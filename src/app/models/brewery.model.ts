import { ProductionCost } from "./productionCost.model";

export class Brewery {
  name: string;
  category: string;
  qty: number;
  price: number;
  baseCost: number;
  productionCost: ProductionCost;
  ratio: number;
  unlocked: boolean;
  seasonalEvent: boolean;
}
