import React from 'react'
import PokemonCollection from './PokemonCollection'
import PokemonForm from './PokemonForm'
import { Search } from 'semantic-ui-react'
import _ from 'lodash'

class PokemonPage extends React.Component {

  //common component... therefore we get state here:

  state = {
    pokemon: [],
    searchTerm: ''
  }

  fetchPokemon = () => {
    fetch('http://localhost:3000/pokemon')
    .then(resp => resp.json())
    .then(pokemon => this.setState({ pokemon: pokemon }))
  }

  componentDidMount() {
    this.fetchPokemon()
  }

  renderPostedPokemon = (newPokemon) => {
    this.setState({
      pokemon: [...this.state.pokemon, newPokemon]
    })
  }

  searchInput = (event) => {
    this.setState({
      searchTerm: event.target.value
    })
  }

  deletePokemon = (clickedPokemonId) => {
    const updatedPokemon = this.state.pokemon.filter(pokemon => pokemon.id !== clickedPokemonId)
    this.setState({
      pokemon: updatedPokemon
    })
  }

  filteredPokemon = () => this.state.pokemon.filter(pokemon => pokemon.name.toLowerCase().includes(this.state.searchTerm.toLowerCase()))
// if we had the curly braces on the above function we would need to put an explicit return in it.

  render() {
    return (
      <div>
        <h1>Pokemon Searcher</h1>
        <br />
        <input onChange={ (event) => { this.searchInput(event) }  } />
        <br />
         {/* <Search onSearchChange={_.debounce(() => console.log('🤔'), 500)} showNoResults={false} /> */}
         <PokemonForm renderPostedPokemon={this.renderPostedPokemon }/>
        <br />
        <PokemonCollection pokemon={this.filteredPokemon()} deletePokemon={this.deletePokemon}/>
        <br />

      </div>
    )
  }

}

export default PokemonPage
