import React, { Component } from 'react'
import { requiredApiLocation } from '../services/pokedexService'

export default class Location extends Component {
 async componentDidMount() {
    console.log(await requiredApiLocation(25));
  }
  render() {
    return (
      <div>
        {}fdfasfdsf
      </div>
    )
  }
}
