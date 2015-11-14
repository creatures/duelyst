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
// 3. The factions data will automatically be added to your paste buffer.
// 4. Open the app/data/cards.js file and paste into module.exports.
//
// ---------------------------------------------------------------------------

function getFactionsJSON() {

  console.log("-------------------------------")
  console.log("FACTIONS")

  var factions = GameDataManager.getInstance().factionsCollection.models
  var data = {"factions": {}}

  for (i = 0; i < factions.length; i++) {
    attributes = factions[i].attributes

    faction = {}
    faction.images = {}

    faction.id = attributes.id
    faction.name = attributes.name
    faction.description = attributes.description
    faction.slug = attributes.devName

    // Images
    faction.images.crest = attributes.crestImg
    faction.images.general = attributes.generalConceptImg

    // Visibility
    faction.enabled = attributes.enabled

    // Save
    data.factions[faction["id"]] = faction

    console.log("-------------------------------")
    console.log(faction.name)
    console.log(attributes)
    console.log(faction)
  }

  console.log("-------------------------------")
  console.log("TOTAL: " + Object.keys(data.factions).length)

  return JSON.stringify(data)

}

copy(getFactionsJSON())
