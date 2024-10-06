//import { usePokemonAPI } from '../../context/PokemonContext';
//import { usePokemonAPI } from '../../hooks/usePokemon';
import { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Pokeball } from '../../assets/pokeball';
import { Card } from '../../components/Card/Card.component';
import './home.style.scss';

const GET_POKEMONS = gql`
  query GetPokemons {
    pokemon_v2_pokemon(limit: 20) {
      id
      name
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
`;

export const Home = () => {
  /* const { pokemon, loading, error } = usePokemonAPI();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const setSelectedPokemon = () => {
    console.log('test');
  }; */
  const { loading, error, data } = useQuery(GET_POKEMONS);
  const [selectedPokemon, setSelectedPokemon] = useState<string | null>(null);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pokemons = data.pokemon_v2_pokemon;

/* 
  return (
    <div className='pokedex'>
      <header>
        <div className='pokedex-header'>
          <Pokeball className='logo' />
          <h1>Pokédex</h1>
        </div>
        <div className='pokedex-search'>
          <input type='search' placeholder='search'></input>
        </div>
      </header>
      <div className='pokedex-content'>
        {pokemon && pokemon.map((p) => (
          <Card 
            key={p.id}
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${p.id}.png`}
            number={p.id}
            name={p.name}
            onClick={() => setSelectedPokemon()}
          />
        ))}
      </div>
    </div>
  ); */
  return (
    <div className="App">
      <div className="pokemon-list">
        {pokemons.map((pokemon: any) => (
          <Card
            key={pokemon.id}
            name={pokemon.name}
            image={JSON.parse(pokemon.pokemon_v2_pokemonsprites[0].sprites).front_default}
            onClick={() => setSelectedPokemon(pokemon.name)}
          />
        ))}
      </div>

      {selectedPokemon && <PokemonDetails name={selectedPokemon} />}
    </div>
  );
};
