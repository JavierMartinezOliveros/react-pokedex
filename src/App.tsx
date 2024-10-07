import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { PokemonDetailPage } from './pages/Detail/PokemonDetailPage';
import { HomePage } from './pages/Home/HomePage';

const App = () => {
  return (
    <Router basename="/react-pokedex">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemon/:id" element={<PokemonDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;