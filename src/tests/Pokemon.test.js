import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
// import pokemon from '../data';

beforeEach(() => { renderWithRouter(<App />); });

describe('Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    const btnEletric = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(btnEletric);

    const namePoke = screen.getByTestId('pokemon-name');
    const nameType = screen.getByTestId('pokemon-type');
    const nameWeight = screen.getByTestId('pokemon-weight');
    const img = screen.getByAltText(/Pikachu sprite/i);
    expect(nameWeight).toBeInTheDocument();
    expect(nameWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(img).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
    expect(img).toHaveAttribute('alt', 'Pikachu sprite');
    expect(namePoke).toHaveTextContent('Pikachu');
    expect(nameType).toHaveTextContent('Electric');
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido;', () => {
    const btnEletric = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(btnEletric);

    const detailLink = screen.getByRole('link', { name: 'More details' });
    expect(detailLink).toBeInTheDocument();
    expect(detailLink).toHaveAttribute('href', '/pokemon/25');
  });

  test('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon;', () => {
    const btnEletric = screen.getByRole('button', { name: 'Electric' });
    userEvent.click(btnEletric);

    const detailLink = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailLink);

    const detailTitle = screen.getByRole('heading', { name: 'Pikachu Details', level: 2 });
    expect(detailTitle).toBeInTheDocument();

    const btnFav = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    userEvent.click(btnFav);
    const iconFav = screen.getByAltText('Pikachu is marked as favorite');
    expect(iconFav).toBeInTheDocument();
    expect(iconFav).toHaveAttribute('src', '/star-icon.svg');
    expect(iconFav).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
