// ---------------------------------------------------------------------------

import React, { Component } from "react"
import Cards from "../data/cards"
import Factions from "../data/factions"

import Header from "./Header"
import Card from "./Card"


// ---------------------------------------------------------------------------

export default class App extends Component {

  constructor() {
    super()
    this.renderCard = this.renderCard.bind(this)
    this.state = {
      cards: Cards.cards,
      factions: Factions.factions
    }
  }

  render() {
    return (
      <div>
        <Header cards={this.state.cards} factions={this.state.factions} />
        <div>
          <section className="layout--body">
            <div className="card--grid">
              {Object.keys(this.state.cards).map(this.renderCard)}
            </div>
          </section>
        </div>
      </div>
    )
  }

  renderCard(key) {
    return (
      <Card key={key} index={key} card={this.state.cards[key]} />
    )
  }

}
