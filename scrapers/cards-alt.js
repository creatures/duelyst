// Enter into the console to retrieve stringified JSON cards

function getCardsJSON() {

  console.log("-------------------------------")
  console.log("CARDS")

  var cards = GameDataManager.getInstance().cardsCollection.models
  var data = {"cards": {}}

  for (i = 0; i < cards.length; i++) {
    attributes = cards[i].attributes

    if (attributes.factionId === 200) { continue }

    // Card
    card = {}
    card.animations = {}
    card.keywords = []

    card.id = attributes.id
    card.name = attributes.name
    card.mana = attributes.manaCost

    // Animations
    // No need yet, still need to figure out how to get assets
    // attributes._baseAnimResource

    // Card Type
    if (attributes.isArtifact) { card.cardType = "Artifact" }
    if (attributes.isSpell) { card.cardType = "Spell" }
    if (attributes.isTile) { card.cardType = "Tile" }
    if (attributes.isUnit) { card.cardType = "Unit" }

    // Description
    // Note: Spells have a description, Units do not
    card.description = attributes.description

    // Faction
    card.faction = attributes.factionName
    card.factionId = attributes.factionId

    // Keywords
    var keywords = attributes.keywordDescriptions
    if (keywords.length) {
      for (var ii = 0; ii < keywords.length; ii++) {
        card.keywords[ii] = keywords[ii].name
      }
    }

    // Races
    card.race = attributes.raceName

    // Rarity
    card.rarity = attributes.rarityName
    card.rarityId = attributes.rarityId

    // Search
    card.searchableContent = attributes.searchableContent

    // Unit
    card.attack = attributes.atk
    card.hp = attributes.hp
    card.isGeneral = attributes.isGeneral

    // Visibility
    card.isHidden = !!attributes.isHiddenInCollection

    // Save
    data.cards[card["id"]] = card

    console.log("-------------------------------")
    console.log(card.name + " - " + card.cardType + " - " + card.id)
    console.log(cards[i])
    console.log(card)

  }

  console.log("-------------------------------")
  console.log("TOTAL: " + Object.keys(data.cards).length);

  return JSON.stringify(data);
}

copy(getCardsJSON());
