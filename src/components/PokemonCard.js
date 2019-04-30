import React from 'react'
import { Card } from 'semantic-ui-react'

class PokemonCard extends React.Component {

  state = {
    cardToggled: true
  }

  cardClickHandler = (event) => {
    if (event.target.className === "cardfrontback") {
      this.setState({cardToggled: !this.state.cardToggled})
    }
  }

  render() {
    return (
      <Card>
        <div className="ui card" onClick={this.cardClickHandler}>
          <div className="image">
            <img className="cardfrontback" src={ this.state.cardToggled ? this.props.pokemon.sprites.front : this.props.pokemon.sprites.back } />
          </div>
          <div className="content">
            <div className="header"> {this.props.pokemon.name}</div>
          </div>
          <div className="extra content">
            <span>
              <i className="icon heartbeat red" />
              {this.props.pokemon.stats.find(stat => stat.name === "hp").value}
              <button onClick={() => {this.props.deletePokemon(this.props.pokemon.id)}}>Delete me</button>
            </span>
          </div>
        </div>
      </Card>
    )
  }
}

export default PokemonCard
