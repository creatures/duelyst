// ---------------------------------------------------------------------------

import React, { Component } from "react"


// ---------------------------------------------------------------------------

export default class Header extends Component {

  constructor() {
    super()
    this.renderFaction = this.renderFaction.bind(this)
  }

  render() {
    return (
      <header>
        <div className="layout--header">
          <h1>Duelyst</h1>
        </div>
        <nav className="layout--nav">
          <div className="faction--list">
            {Object.keys(this.props.factions).map(this.renderFaction)}
          </div>
          <aside className="copy--displaying">
            Displaying {Object.keys(this.props.cards).length} cards
          </aside>
        </nav>
      </header>
    )
  }

  renderFaction(key) {
    return (
      <a key={key} className="faction--listing" href="#">
        {this.props.factions[key].slug}
      </a>
    )
  }

}
