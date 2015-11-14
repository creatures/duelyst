// Enter into the console to retrieve stringified JSON cards

function getCardsJSON() {

  console.log("-------------------------------")
  console.log("CARDS")

  var cards = GameDataManager.getInstance().cardsCollection.models
  var data = {"cards": {}}

  for (i = 0; i < cards.length; i++) {
    var attributes = cards[i].attributes

    // Skip Unavailable, Hidden, Token, Training Teacher
    if (attributes.isAvailable === false) { continue }
    if (attributes.isHiddenInCollection) { continue }
    if (attributes.rarityName === "Token") { continue }
    if (attributes.factionId === 200) { continue }

    // Card
    card = {}
    card.animations = {}
    card.keywords = []

    // Basic
    card.id = attributes.id
    card.name = attributes.name
    card.mana = attributes.manaCost

    // Category
    if (attributes.isArtifact) { card.category = "artifact" }
    if (attributes.isSpell) { card.category = "spell" }
    if (attributes.isTile) { card.category = "tile" }
    if (attributes.isUnit) { card.category = "unit" }

    // Description
    // Note: Spells have a description, Units do not
    card.description = attributes.description

    // Faction
    card.faction = attributes.factionName
    card.factionId = attributes.factionId
    card.factionSlug = card.faction.split(" ")[0].toLowerCase()

    // Keywords
    var keywords = attributes.keywordDescriptions
    if (keywords.length) {
      for (var ii = 0; ii < keywords.length; ii++) {
        card.keywords[ii] = keywords[ii].name
      }
    }

    // Race
    card.race = attributes.raceName

    // Rarity
    card.rarity = attributes.rarityName
    card.rarityId = attributes.rarityId

    // Search
    card.searchableContent = attributes.searchableContent

    // Type
    if (attributes.raceName) {
      card.type = attributes.raceName
    } else if (attributes.isGeneral) {
      card.type = "General"
    } else if (attributes.isArtifact) {
      card.type = "Artifact"
    } else if (attributes.isSpell) {
      card.type = "Spell"
    } else {
      card.type = "Minion"
    }

    // Unit
    card.attack = attributes.atk
    card.hp = attributes.hp
    card.isGeneral = attributes.isGeneral

    // Visibility
    card.isHidden = attributes.isHiddenInCollection

    // Save
    data.cards[card["id"]] = card

    console.log("-------------------------------")
    console.log(card.name + " - " + card.category + " - " + card.id)
    console.log(cards[i])
    console.log(card)

  }

  console.log("-------------------------------")
  console.log("TOTAL: " + Object.keys(data.cards).length);

  return JSON.stringify(data);
}

copy(getCardsJSON());
