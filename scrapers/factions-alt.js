// Enter into the console to retrieve stringified JSON cards

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
