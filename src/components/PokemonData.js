import React, { Component } from 'react';
import { pokemonType } from '../types';
import { Link } from 'react-router-dom';

class PokemonData extends Component {
  render() {
    const { pokemon } = this.props;
    const { summary, foundAt, name } = pokemon;

    return (
      <>
        <section>
          <h2>{ `Summary` }</h2>
          <p>{ `${summary}` }</p>
        </section>
        <section>
          <h2>{ `Game Locations of ${name}` }</h2>
          {/* <Link className="link" to="/location">{`Location`}</Link> */}
          <div className="pokemon-habitat">
            { foundAt.map(({ location, map }) => (
              <div key={ location }>
                <img src={ `${map}` } alt={ `${name} location` } />
                <p><em>{ location }</em></p>
              </div>
            )) }
          </div>
        </section>
      </>
    );
  }
}

PokemonData.propTypes = {
  pokemon: pokemonType.isRequired,
};

export default PokemonData;
