export const readFavoritePokemonIds = () => (
  JSON.parse(localStorage.getItem('favoritePokemonIds')) || []
);

const saveFavoritePokemon = (pokemonList) => (
  localStorage.setItem('favoritePokemonIds', JSON.stringify(pokemonList))
);

const addPokemonToFavorites = (pokemonId) => {
  const favoritePokemon = readFavoritePokemonIds();
  const newFavoritePokemon = [...favoritePokemon, pokemonId];

  saveFavoritePokemon(newFavoritePokemon);
};

const removePokemonFromFavorites = (pokemonId) => {
  const favoritePokemon = readFavoritePokemonIds();
  const newFavoritePokemon = favoritePokemon.filter((id) => id !== pokemonId);

  saveFavoritePokemon(newFavoritePokemon);
};

export const updateFavoritePokemon = (pokemonId, isFavorite) => (
  isFavorite ? addPokemonToFavorites(pokemonId) : removePokemonFromFavorites(pokemonId)
);

export const requiredApiLocation = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/encounters`)
  const data = await response.json();
  return data;
}
