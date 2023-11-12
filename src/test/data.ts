export const cardData = {
  id: 'smp-SM112',
  name: "Ash's Pikachu",
  supertype: 'Pokémon',
  subtypes: ['Basic'],
  hp: '70',
  types: ['Lightning'],
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
  rarity: 'Promo',
  flavorText:
    'This form of Pikachu is somewhat rare. It wears the hat of its Trainer, who is also its partner.',
  images: {
    small: 'https://images.pokemontcg.io/smp/SM112.png',
    large: 'https://images.pokemontcg.io/smp/SM112_hires.png',
  },
};
