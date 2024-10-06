import { useQuery, gql } from "@apollo/client";

// Definir los tipos
interface PokemonType {
  pokemon_v2_type: {
    name: string;
  };
}

interface PokemonStat {
  base_stat: number;
  pokemon_v2_stat: {
    name: string;
  };
}

interface PokemonFlavorText {
  flavor_text: string;
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  base_happiness: string;
  pokemon_v2_pokemontypes: PokemonType[];
  pokemon_v2_pokemonstats: PokemonStat[];
  pokemon_v2_pokemonspeciesflavortexts: PokemonFlavorText[];
}

const GET_POKEMONS = gql`
  query GetPokemons {
    pokemon_v2_pokemon(limit: 10) {
      id
      name
      height
      weight
      base_experience
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
    }
  }
`;

export const usePokemonAPI = () => {
  const { data, loading, error } = useQuery(GET_POKEMONS);

  const pokemon: Pokemon[] | null = data?.pokemon_v2_pokemon || null;

  return { pokemon, loading, error };
};
