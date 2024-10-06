import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import { Pokeball } from './assets/pokeball';
import { Card } from './components/Card/Card.component';
import { PokemonDetailPage } from './pages/Detail/PokemonDetailPage';
import './home.style.scss';

interface Pokemon {
  id: number;
  name: string;
}

const GET_POKEMONS = gql`
  query GetPokemons {
    pokemon_v2_pokemon(order_by: { name: asc }) {
      id
      name
    }
  }
`;

const HomePage = () => {
  const ITEMS_PER_PAGE = 12;
  const [page, setPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');

  const { loading, error, data } = useQuery(GET_POKEMONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pokemons = data.pokemon_v2_pokemon;

  const filteredPokemons = pokemons.filter((pokemon: Pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedPokemons = filteredPokemons.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

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
        {paginatedPokemons.map((pokemon: Pokemon) => (
          <Card
            key={pokemon.id}
            number={pokemon.id}
            name={pokemon.name}
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
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
          disabled={paginatedPokemons.length < ITEMS_PER_PAGE}
        >
          <img src="/public/arrow-right.png" />
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;
