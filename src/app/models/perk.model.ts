import { Price } from "./price.model";

export class Perk {
  id: number;
  name: string;
  image: string;
  price?: Price[];
  unlocked: boolean;
  purchased: boolean;
}
