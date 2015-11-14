//
// OVERVIEW
//
// This scraper access game data through the GameDataManger. This object
// appears to hold data that has already been assembled through other means
// as it does not appear to contain hidden cards, factions, etc.
//
// ---------------------------------------------------------------------------
//
// USAGE:
//
// 1. Visit http://beta.duelyst.com and open the console.
// 2. Paste this file into the console and hit enter.
// 3. The assets data will automatically be added to your paste buffer.
// 4. Open the app/data/assets.js file and paste into module.exports.
//
// ---------------------------------------------------------------------------

function getAssetsJSON() {

  console.log("-------------------------------")
  console.log("ASSETS")

  var cards = GameDataManager.getInstance().cardsCollection.models
  var data = {"cards": {}}

  for (i = 0; i < cards.length; i++) {
    var attributes = cards[i].attributes

    // Skip Hidden, Token, and cards that belong to "Training Teacher"
    if (attributes.isHiddenInCollection) { continue }
    if (attributes.rarityName === "Token") { continue }
    if (attributes.factionId === 200) { continue }

    // Card
    card = {}

    // Basic
    card.id = attributes.id
    card.name = attributes.name

    // Assets
    var animations = attributes.card._baseAnimResource
    var animationId = animations["idle"]
    var resource = RSX[animationId]
    card.frame = resource.framePrefix
    card.plist = resource.plist
    card.sprite = resource.img

    // Slug
    var url = card.sprite
    var pieces = url.split("/")
    var filename = pieces[pieces.length - 1]
    var slug = filename.split(".")[0]
    card.slug = slug

    // Save
    data.cards[card["id"]] = card

    console.log("-------------------------------")

    var txtPlist = (card.plist) ? "plist [x] " : ""
    var txtSprite = (card.sprite) ? "sprite [x] " : ""

    console.log(card.name + " - " + txtPlist + " " + txtSprite)
    console.log(cards[i])
    console.log(card)
  }

  console.log("-------------------------------")
  console.log("TOTAL: " + Object.keys(data.cards).length);

  return JSON.stringify(data);
}

copy(getAssetsJSON());
