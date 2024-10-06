import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { useState } from 'react';
import { Pokeball } from './assets/pokeball';
import { Card } from './components/Card/Card.component';
import { PokemonDetailPage } from './pages/Detail/PokemonDetailPage';
import './pages/Home/home.style.scss';

// Query para obtener los Pokémon con paginación
const GET_POKEMONS = gql`
  query GetPokemons($limit: Int!, $offset: Int!) {
    pokemon_v2_pokemon(limit: $limit, offset: $offset) {
      id
      name
    }
  }
`;

const HomePage = () => {
  const ITEMS_PER_PAGE = 12; // Cantidad de Pokémon por página
  const [page, setPage] = useState(0); // Estado para manejar la página actual
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'id'>('name');

  // Calcula el `offset` para la query con base en la página actual
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: {
      limit: ITEMS_PER_PAGE,
      offset: page * ITEMS_PER_PAGE, // Mueve el offset según la página
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pokemons = [...data.pokemon_v2_pokemon].sort((a: any, b: any) => a.name.localeCompare(b.name));

  // Filtro de Pokémon según el término de búsqueda y tipo (nombre o id)
  const filteredPokemons = pokemons.filter((pokemon: any) => {
    if (searchType === 'name') {
      return pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    } else if (searchType === 'id') {
      return pokemon.id.toString().includes(searchTerm);
    }
    return true;
  });

  // Funciones para manejar la navegación entre páginas
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
            placeholder={`Search by ${searchType}`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="search-type-toggle"
            onClick={() => setSearchType(searchType === 'name' ? 'id' : 'name')}
          >
            Search by {searchType === 'name' ? 'ID' : 'Name'}
          </button>
        </div>
      </header>

      <div className="pokedex-content">
        {filteredPokemons.map((pokemon: any) => (
          <Card
            key={pokemon.id}
            number={pokemon.id}
            name={pokemon.name}
            image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
            onClick={() => window.location.href = `/pokemon/${pokemon.id}`}
          />
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrevPage} disabled={page === 0}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={pokemons.length < ITEMS_PER_PAGE}>
          Next
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
        <Route path="/pokemon/:id" element={<PokemonDetailPage />} /> {/* Ruta para detalle */}
      </Routes>
    </Router>
  );
};

export default App;
