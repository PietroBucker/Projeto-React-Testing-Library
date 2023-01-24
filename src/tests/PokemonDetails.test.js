import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela:', () => {
    renderWithRouter(<App />);
    const btnDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(btnDetails);
    const titleSumary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(btnDetails).not.toBeInTheDocument();
    expect(titleSumary).toBeInTheDocument();

    screen.getByText('This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.');

    const btnFav = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(btnFav);
    expect(btnFav).toBeChecked();
  });

  test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
    renderWithRouter(<App />);
    const btnDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(btnDetails);
    const title = screen.getByRole('heading', { name: /pikachu details/i, level: 2 });
    const titleSumary = screen.getByRole('heading', { name: /Game Locations of/i, level: 2 });
    expect(title).toBeInTheDocument();
    expect(titleSumary).toBeInTheDocument();

    const imgLocation = screen.getAllByAltText(/location/);
    const nameLocation1 = screen.getByText('Kanto Viridian Forest');
    const nameLocation2 = screen.getByText('Kanto Power Plant');
    expect(imgLocation[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
    expect(imgLocation[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(nameLocation1).toBeInTheDocument();
    expect(nameLocation2).toBeInTheDocument();
  });

  test('verifica se nao estiver nenhum pokemon favoritado retorna No favorite Pokémon found na tela', () => {
    renderWithRouter(<App />);
    const btnDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(btnDetails);

    const btnFav = screen.getByRole('checkbox');
    userEvent.click(btnFav);
    expect(btnFav).not.toBeChecked();

    const linkFav = screen.getByRole('link', { name: 'Favorite Pokémon' });
    userEvent.click(linkFav);
    const noFound = screen.getByText('No favorite Pokémon found');
    expect(noFound).toBeDefined();
  });
});
