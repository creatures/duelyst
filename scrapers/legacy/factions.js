//
// OVERVIEW
//
// This scraper access game data through the SDK. This SDK object appears to
// contain data for all aspects of the game in a modular form. Unlike the
// GameDataManager the SDK isn't complete without tying the data together. For
// example, card descriptions are still extracted into modifiers so they'd
// need to be pieced together to get useful data to extract. That being said,
// the SDK seems to have more data including upcoming cards, factions, etc.
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

function getFactionsJSON() {

  console.log("-------------------------------")
  console.log("FACTIONS")

  var factions = SDK.FactionFactory.getAllFactions(GameSession.getInstance())
  var data = {"factions": {}}

  for (i = 0; i < factions.length; i++) {
    faction = {}
    faction.images = {}

    faction.id = factions[i].id
    faction.name = factions[i].name
    faction.description = factions[i].description
    faction.slug = factions[i].devName
    faction.enabled = factions[i].enabled
    faction.isInDevelopment = factions[i].isInDevelopment
    faction.isNeutral = factions[i].isNeutral
    faction.images.crest = factions[i].crestImg
    faction.images.general = factions[i].generalConceptImg

    data.factions[faction["id"]] = faction

    console.log("-------------------------------")
    console.log(faction.name)
    console.log(factions[i])
    console.log(faction)
  }

  console.log("-------------------------------")
  console.log("TOTAL: " + Object.keys(data.factions).length)

  return JSON.stringify(data)

}

copy(getFactionsJSON())
