import {Perk} from './perk.model';

export class PerkSlot {
  id: number;
  name: string;
  unlocked: boolean;
  limit: number;
  assignedPerk?: Perk;
}
