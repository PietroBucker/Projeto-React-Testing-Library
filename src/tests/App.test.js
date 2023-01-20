import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const favoritePokemon = 'Favorite Pokémon';
beforeEach(() => {
  renderWithRouter(<App />);
});
describe('Teste se o topo da aplicação contém um conjunto fixo de links de navegação:', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    const linksInHome = screen.getAllByRole('link');
    expect(linksInHome.length).toBe(4);

    expect(linksInHome[0]).toBeInTheDocument();
    expect(linksInHome[0]).toHaveTextContent('Home');

    expect(linksInHome[1]).toBeInTheDocument();
    expect(linksInHome[1]).toHaveTextContent('About');

    expect(linksInHome[2]).toBeInTheDocument();
    expect(linksInHome[2]).toHaveTextContent(favoritePokemon);

    expect(linksInHome[3]).toBeInTheDocument();
    expect(linksInHome[3]).toHaveTextContent('More details');
  });

  test('este se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link Home', () => {
    const linkHome = screen.getByRole('link', { name: 'Home' });
    userEvent.click(linkHome);
    const title = screen.getByRole('heading', { name: 'Pokédex' });
    expect(title).toBeInTheDocument();
  });

  test('este se a aplicação é redirecionada para a página inicial, na URL / ao clicar no link About', () => {
    const linkAbout = screen.getByRole('link', { name: 'About' });
    userEvent.click(linkAbout);

    const img = screen.getByAltText(/pokédex/i);
    const title = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(title).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

  test('Teste se a aplicação é redirecionada para a página de Pokémon Favoritados, na URL /favorites, ao clicar no link Favorite Pokémon da barra de navegação;', () => {
    const linkDatail = screen.getByRole('link', { name: favoritePokemon });
    userEvent.click(linkDatail);
    const title = screen.getByRole('heading', { name: favoritePokemon, level: 2 });
    expect(title).toBeInTheDocument();
  });

  test('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/que-nao-existe/');
    });
    const notFound = screen.getByRole('heading', { name: 'Page requested not found' });
    expect(notFound).toBeInTheDocument();
  });
});
