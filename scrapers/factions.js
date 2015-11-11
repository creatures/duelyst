// Enter into the console to retrieve stringified JSON factions

function GetFactionsJSON() {

  console.log("-------------------------------")
  console.log("FACTIONS")

  var factions = SDK.FactionFactory.getAllFactions(GameSession.getInstance());
  var data = {"factions" : {}};

  for (i = 0; i < factions.length; i++) {
    faction = {}
    faction.images = {}

    faction.id = factions[i].id;
    faction.name = factions[i].name;
    faction.description = factions[i].description;
    faction.slug = factions[i].devName;
    faction.enabled = factions[i].enabled;
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
  console.log("TOTAL: " + Object.keys(data.factions).length);

  return JSON.stringify(data);

}

copy(GetFactionsJSON());
