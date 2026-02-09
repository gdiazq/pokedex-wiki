export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetails {
  id: number;
  name: string;
  sprites: {
    front_default: string;
    other: {
      dream_world: {
        front_default: string;
      };
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: Array<{
    type: {
      name: string
    }
  }>;
  weight: number;
  height: number;
  abilities: Array<{
    ability: {
      name: string
    }
  }>;
  description?: string;
}
