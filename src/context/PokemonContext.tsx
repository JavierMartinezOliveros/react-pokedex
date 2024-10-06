import { useState, useEffect } from "react";
import axios from "axios";

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

interface PokemonAPIResponse {
  data: {
    pokemon_v2_pokemon: Pokemon[];
  };
}

export const usePokemonAPI = () => {
  const [pokemon, setPokemon] = useState<Pokemon[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = `
      query {
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
          base_happiness
        }
      }
    `;

    axios
      .post<PokemonAPIResponse>(
        "https://beta.pokeapi.co/graphql/v1beta",
        { query },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        setPokemon(response.data.data.pokemon_v2_pokemon);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return { pokemon, loading, error };
};
