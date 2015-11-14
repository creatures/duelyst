// Enter into the console to retrieve stringified JSON cards

function GetCardsJSON() {

  console.log("-------------------------------")
  console.log("CARDS")

  var cards = SDK.CardFactory.getAllCards(GameSession.getInstance())
  var data = {"cards": {}}

  for (i = 0; i < cards.length; i++) {
    card = {}
    card.animations = {}
    card.modifiers = {}

    card.id = cards[i].id
    card.name = cards[i].name
    card.mana = cards[i].manaCost
    card.attack = cards[i].atk
    card.hp = cards[i].maxHP
    card.isGeneral = cards[i].isGeneral
    card.factionId = cards[i].factionId
    card.isHidden = !!cards[i]._isHiddenInCollection

    // Card Type
    // SDK.CardType.Artifact, SDK.CardType.Spell, SDK.CardType.Unit

    // Description
    // Note: Spells have a description, Units do not
    card.description = cards[i]._description

    // Races
    // Golem, Arcanyst, Dervish, etc.
    if (cards[i].raceId) {
      card.raceId = cards[i].raceId
      card.race = SDK.RaceFactory.raceForIdentifier(card.raceId)
    }

    // Rarity
    // SDK.RarityFactory.getAllRarities()
    // 0 - Basic, 1 - Common, 2 - Rare, 3 - Epic, 4 - Legendary, 5 - Token
    card.rarityId = cards[i].rarityId

    // Modifiers
    // var modifiers = cards[i].modifiersContextObjects
    // for (ii = 0; ii < modifiers.length; ii++) {
    //   card.modifiers
    // }
    //
    // No Love
    // SDK.ModifierFactory.modifierForContextObject("ModifierSummonWatchNearbyApplyModifiersOncePerTurn")

    if (cards[i]._baseAnimResource) {
      // Spells: active, idle
      // Units: attack, breathing, damage, death, idle, walk
      // card.animations.active = cards[i]._baseAnimResource.active
      // card.animations.attack = cards[i]._baseAnimResource.attack
      // card.animations.breathing = cards[i]._baseAnimResource.breathing
      // card.animations.damage = cards[i]._baseAnimResource.damage
      // card.animations.death = cards[i]._baseAnimResource.death
      // card.animations.idle = cards[i]._baseAnimResource.idle
      // card.animations.walk = cards[i]._baseAnimResource.walk
    }

    // Damage Amount
    // Returns the number of damage done by spells, could be useful someday
    // card.damageAmount = cards[i].damageAmount


    data.cards[card["id"]] = card

    console.log("-------------------------------")
    console.log(card.name + " - " + "Card Type" + " - " + card.id)
    console.log("Artifact: " + SDK.CardType.getIsArtifactCardType(cards[i]))
    console.log("Spell: " + SDK.CardType.getIsSpellCardType(cards[i]))
    console.log("Unit: " + SDK.CardType.getIsUnitCardType(cards[i]))
    console.log(cards[i])
    console.log(card)

  }

  console.log("-------------------------------")
  console.log("TOTAL: " + Object.keys(data.cards).length);

  return JSON.stringify(data);
}
copy(GetCardsJSON());
