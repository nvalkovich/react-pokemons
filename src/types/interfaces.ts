export interface CardData {
  id: string;
  name: string;
  level: string;
  rarity: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  rules?: string[];
  abilities?: Ability[];
  attacks?: Attack[];
  flavorText?: string;
  images: Images;
}

interface Ability {
  name: string;
  text: string;
  type: string;
}

interface Attack {
  cost: string[];
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: string;
}

interface Images {
  small: string;
  large: string;
}

export interface CardsResponse {
  data: CardData[];
  page: number;
  pageSize: number;
  totalCount: number;
}

export interface QueryParams {
  key: string;
  value: string | number;
}
