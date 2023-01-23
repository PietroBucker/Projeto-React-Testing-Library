import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../pages/Pokedex';
import renderWithRouter from '../renderWithRouter';
import pokemonList from '../data';

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: false,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

beforeEach(() => {
  renderWithRouter(<Pokedex
    pokemonList={ pokemonList }
    isPokemonFavoriteById={ isPokemonFavoriteById }
  />);
});

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    const title = screen.getByRole('heading', { name: 'Encountered Pokémon' });
    expect(title).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    const pokeName = screen.getByText('Pikachu');
    expect(pokeName).toBeInTheDocument();
    expect(pokeName).toHaveTextContent('Pikachu');

    const btnNext = screen.getByRole('button', { name: 'Próximo Pokémon' });
    userEvent.click(btnNext);
    expect(pokeName).toHaveTextContent('Charmander');
  });

  test('Teste se mostrado apenas 1 pokemon', () => {
    const pokeNameQuantity = screen.getAllByTestId('pokemon-type-button');
    expect(pokeNameQuantity).toHaveLength(7);
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro:', () => {
    const btnAll = screen.getByRole('button', { name: 'All' });
    userEvent.click(btnAll);
    expect(btnAll).toBeValid();
    expect(btnAll).toBeInTheDocument();
    expect(btnAll).toContainHTML('All');
  });

  test('A Pokedéx deverá mostrar os Pokémon normalmente (sem filtros) quando o botão All for clicado', () => {
    const btnAll = screen.getByRole('button', { name: 'Electric' });
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);
    const pokeName = screen.getByText('Pikachu');
    expect(pokeName).toBeInTheDocument();
  });

  test('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', () => {
    renderWithRouter(<Pokedex
      pokemonList={ pokemonList }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />);

    const fireButton = screen.getByRole('button', { name: /fire/i });
    const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
    const allPokemons = screen.getByRole('button', { name: /all/i });
    const pokemonsFireType = pokemonList.filter(({ type }) => type === 'Fire');

    expect(fireButton).toBeInTheDocument();
    userEvent.click(fireButton);

    pokemonsFireType.forEach(({ name }) => {
      expect(screen.getByTestId('pokemon-name').innerHTML).toBe(name);
      expect(screen.getByTestId('pokemon-type').innerHTML).toBe(fireButton.innerHTML);
      userEvent.click(nextPokemon);
    });

    userEvent.click(allPokemons);

    pokemonList.forEach(({ name }, index) => {
      if (index === 8) {
        userEvent.click(nextPokemon);
        expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
      } else {
        expect(screen.getByText(name)).toBeInTheDocument();
        userEvent.click(nextPokemon);
      }
    });
  });
});
