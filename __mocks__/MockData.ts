export const mockCardList = [
  {
    id: 'smp-SM112',
    name: "Ash's Pikachu",
    supertype: 'Pokémon',
    subtypes: ['Basic'],
    hp: '70',
    types: ['Lightning'],
    rarity: 'Promo',
    flavorText:
      'This form of Pikachu is somewhat rare. It wears the hat of its Trainer, who is also its partner.',
    images: {
      small: 'https://images.pokemontcg.io/smp/SM112.png',
      large: 'https://images.pokemontcg.io/smp/SM112_hires.png',
    },
  },
  {
    id: 'pl2-92',
    name: "Lucian's Assignment",
    supertype: 'Trainer',
    subtypes: ['Basic'],
    types: ['Lightning'],
    hp: '90',
    rarity: 'Rare',
    attacks: [
      {
        name: 'Quick Attack',
        cost: ['Colorless'],
        convertedEnergyCost: '1',
        damage: '10+',
        text: 'Flip a coin. If heads, this attack does 10 more damage.',
      },
      {
        name: 'Electro Ball',
        cost: ['Lightning', 'Colorless', 'Colorless'],
        convertedEnergyCost: '3',
        damage: '50',
        text: '',
      },
    ],
    flavorText:
      'This form of Pikachu is somewhat rare. It wears the hat of its Trainer, who is also its partner.',
    images: {
      small: 'https://images.pokemontcg.io/smp/SM112.png',
      large: 'https://images.pokemontcg.io/smp/SM112_hires.png',
    },
  },
  {
    id: 'smp-SM108',
    name: "Ash's Pikachu",
    supertype: 'Pokémon',
    subtypes: ['Basic'],
    types: ['Lightning'],
    hp: '100',
    rarity: 'Rare',
    flavorText:
      'This form of Pikachu is somewhat rare. It wears the hat of its Trainer, who is also its partner.',
    images: {
      small: 'https://images.pokemontcg.io/smp/SM112.png',
      large: 'https://images.pokemontcg.io/smp/SM112_hires.png',
    },
  },
];

export const mockPaginationData = {
  page: 5,
  pageSize: 4,
  totalCount: 100,
};

export const mockQueryParams = [
  { key: 'pageSize', value: '4' },
  { key: 'page', value: '1' },
  { key: 'q', value: 'pok' },
];
