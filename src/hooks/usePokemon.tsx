import { useQuery, gql } from "@apollo/client";

const GET_POKEMONS = gql`
  query GetPokemons($limit: Int, $offset: Int, $searchTerm: String) {
    pokemon_v2_pokemon(
      where: { name: { _ilike: $searchTerm } }
      limit: $limit
      offset: $offset
      order_by: { name: asc }
    ) {
      id
      name
    }
  }
`;

export const usePokemonAPI = (page: number, itemsPerPage: number, searchTerm: string) => {
  const offset = page * itemsPerPage;

  const { data, loading, error } = useQuery(GET_POKEMONS, {
    variables: {
      limit: itemsPerPage,
      offset,
      searchTerm: `%${searchTerm}%`, // Búsqueda flexible (LIKE)
    },
  });

  const pokemon = data?.pokemon_v2_pokemon || [];

  return { pokemon, loading, error };
};
