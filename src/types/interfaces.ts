export interface CardData {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  number: string;
  rarity: string;
}

export interface QueryParams {
  key: string;
  value: string | number;
}
