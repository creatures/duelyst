// ---------------------------------------------------------------------------

import React, { Component } from "react"


// ---------------------------------------------------------------------------

export default class Card extends Component {

  render() {

    const card = this.props.card
    const key = this.props.index
    const className = "card--detail is-" + card.category

    return (
      <div key={key} className={className}>
        <div className="glow" />
        <div className="background" />
        <div className="card-header">
          <div className="mana-cost">
            <span>
              {card.mana}
            </span>
          </div>
        </div>
        <div className="card-sprite">
          <div className="window">
            <img className="sprite" src={require("../images/avatar/" + card.id + ".png")} />
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

}
