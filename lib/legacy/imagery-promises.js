//
// NOTE:
//
// This is an attempt to create the imagery retriving/saving script with
// promises. It is not current working as the methods don't actually seem
// to be returning promises. Once they are returning promises the script
// needs to be updated to handle an array of cards
//

// ---------------------------------------------------------------------------

var Promise = require("bluebird"),
  fs = Promise.promisifyAll(require("fs")),
  gm = Promise.promisifyAll(require("gm")),
  plist = require("plist"),
  request = require("request-promise")


// ---------------------------------------------------------------------------
// Test Data

var card = {
  slug: "neutral_zurael",
  plist: "https://assets-counterplaygames.netdna-ssl.com/production/resources/units/neutral_zurael.plist",
  sprite: "https://assets-counterplaygames.netdna-ssl.com/production/resources/units/neutral_zurael.png"
}


// ---------------------------------------------------------------------------

var getXML = function() {
  console.log("getXML")
  return request({url: card.plist, gzip: true})
}

var writeXML = function(file){
  console.log("writeXML")
  return fs.writeFile("./lib/card.plist", file)
}

var getSprite = function() {
  console.log("getSprite")
  return request({url: card.sprite, gzip: true, encoding: "binary"})
}

var writeSprite = function(file) {
  console.log("writeSprite")
  return fs.writeFile("./lib/card.png", file, "binary")
}

var parseXML = function() {
  console.log("parseXML")
  var obj = plist.parse(fs.readFileSync("./lib/card.plist", "utf8"))
  var framename = card.slug + "_idle_000.png"
  var frame = obj.frames[framename].frame
  var values = frame.replace(/[{}]/g, "").split(",")
  var data = { x: values[0], y: values[1], width: values[2], height: values[3] }
  return data
}

// Not returning a promise due to chained methods
var cropImage = function(data){
  console.log("cropImage")
  return gm("./lib/card.png")
    .crop(data.width, data.height, data.x, data.y)
    .write("./lib/avatar.png", function(error){
      if (!error) {
        fs.unlink("./lib/card.plist")
        fs.unlink("./lib/card.png")
        console.log("Image Created")
      }
    })
}


// ---------------------------------------------------------------------------

getXML()
  .then(writeXML)
  .then(getSprite)
  .then(writeSprite)
  .then(parseXML)
  .then(cropImage)
  .catch(function(error){
    console.log(error)
  })
  .done()
