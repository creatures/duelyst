import React, { Component } from "react"
import Cards from "../data/cards"
import Factions from "../data/factions"

export default class App extends Component {

  constructor() {
    super()

    this.renderCard = this.renderCard.bind(this)
    this.renderFaction = this.renderFaction.bind(this)

    this.state = {
      cards: Cards.cards,
      factions: Factions.factions
    }
  }

  render() {
    return (
      <div>
        <div className="layout--header">
          <h1>Duelyst</h1>
        </div>
        <section>
          <div className="faction--list">
            {Object.keys(this.state.factions).map(this.renderFaction)}
          </div>
        </section>
        <section>
          <div className="card--grid">
            {Object.keys(this.state.cards).map(this.renderCard)}
          </div>
        </section>
      </div>
    )
  }

  renderCard(key) {
    const card = this.state.cards[key]
    const className = "card--detail is-" + card.category

    return (
      <div key={key} className={className}>
        <div className="glow" />
        <div className="background" />
        <div className="card-header">
          <div className="mana-cost">
            {card.mana}
          </div>
        </div>
        <div className="card-sprite">
          <div className="window">
            <img className="sprite" src={card.animations.sourceImage} />
          </div>
        </div>
        <div className="card-caption">
          <h5 className="name">
            {card.name}
          </h5>
          <p className="type">
            {card.type}
          </p>
          <p className={"rarity is-" + card.rarity}>
            {card.rarity}
          </p>
          <ul className="stats">
            <li className="stat is-attack">
              <span className="value">
                {card.attack}
              </span>
            </li>
            <li className="stat is-hp">
              <span className="value">
                {card.hp}
              </span>
            </li>
          </ul>
        </div>
        <div className="description">
          <span dangerouslySetInnerHTML={{__html: card.description}} />
        </div>
      </div>
    )
  }

  renderFaction(key) {
    return (
      <a key={key} className="faction--listing" href="#">
        {this.state.factions[key].slug}
      </a>
    )
  }

}
