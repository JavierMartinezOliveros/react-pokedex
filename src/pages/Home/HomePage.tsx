import { useState } from 'react';
import { Pokeball } from '../../assets/pokeball';
import { Card } from '../../components/Card/Card.component';
import { usePokemonAPI } from '../../hooks/usePokemon';
import { getPokemonImageUrl } from '../../components/Utils/pokemonImage';
import './home.style.scss';

interface Pokemon {
  id: number;
  name: string;
}

export const HomePage = () => {
  const ITEMS_PER_PAGE = 12;
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const { pokemon: paginatedPokemons, loading, error } = usePokemonAPI(page, ITEMS_PER_PAGE, searchTerm);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleNextPage = () => setPage(page + 1);
  const handlePrevPage = () => setPage(page > 0 ? page - 1 : 0);

  return (
    <div className="pokedex pokedex-home">
      <header>
        <div className="pokedex-header">
          <Pokeball className="logo" />
          <h1>Pokédex</h1>
        </div>
        <div className="pokedex-search">
          <input
            type="search"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="pokedex-content">
        {paginatedPokemons?.map((pokemon: Pokemon) => (
          <Card
            key={pokemon.id}
            number={pokemon.id}
            name={pokemon.name}
            image={getPokemonImageUrl(pokemon.id)}
          />
        ))}
      </div>

      <div className="navigation">
        <button 
          className="navigation-left" 
          onClick={handlePrevPage}
          disabled={page === 0}
        >
          <img src="/public/arrow-left.png" />
        </button>
        <button 
          className="navigation-right" 
          onClick={handleNextPage}
          disabled={paginatedPokemons?.length < ITEMS_PER_PAGE}
        >
          <img src="/public/arrow-right.png" />
        </button>
      </div>
    </div>
  );
};
