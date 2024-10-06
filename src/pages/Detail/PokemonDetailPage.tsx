import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { Detail } from '../../components/Detail/Detail.component';

const GET_POKEMON_DETAIL = gql`
  query GetPokemonDetail($id: Int!) {
    pokemon_v2_pokemon_by_pk(id: $id) {
      id
      name
      height
      weight
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonabilities {
        pokemon_v2_ability {
          name
        }
      }
      pokemon_v2_pokemonspecy {
        pokemon_v2_pokemonspeciesflavortexts {
          flavor_text
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

export const PokemonDetailPage = () => {
  const { id } = useParams<{ id: string }>();

  const { loading, error, data } = useQuery(GET_POKEMON_DETAIL, {
    variables: { id: parseInt(id || '0', 10) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pokemon = data.pokemon_v2_pokemon_by_pk;

  const firstType = pokemon.pokemon_v2_pokemontypes[0]?.pokemon_v2_type.name || 'unknown';

  const types = pokemon.pokemon_v2_pokemontypes.map((typeEntry: any) => typeEntry.pokemon_v2_type.name);

  const moves = pokemon.pokemon_v2_pokemonabilities.map((moveEntry: any) => moveEntry.pokemon_v2_ability.name).join(' ');
 
  const descriptions = pokemon.pokemon_v2_pokemonspecy.pokemon_v2_pokemonspeciesflavortexts;

  const flavorText = descriptions.length > 0 ? descriptions[0].flavor_text : 'No description available';

  //passing stats to abreviated stats
  const statAbbr: { [key: string]: string } = {
    hp: 'hp',
    attack: 'atk',
    defense: 'def',
    'special-attack': 'satk',
    'special-defense': 'sdef',
    speed: 'spd',
  };

  const stats = pokemon.pokemon_v2_pokemonstats.map((statEntry: any) => ({
    name:  statAbbr[statEntry.pokemon_v2_stat.name].toUpperCase() || statEntry.pokemon_v2_stat.name,
    value: statEntry.base_stat,
  }));

  return (
    <div className={`pokedex ${firstType}`}>
      <Detail
        name={pokemon.name}
        number={pokemon.id}
        image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
        height={pokemon.height}
        weight={pokemon.weight}
        types={types}
        moves={moves}
        description={flavorText}
        stats={stats}
      />
    </div>
  );
};
