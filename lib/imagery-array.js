// ---------------------------------------------------------------------------
// Vendor

var Promise = require("bluebird"),
  fs = Promise.promisifyAll(require("fs")),
  gm = Promise.promisifyAll(require("gm")),
  plist = require("plist"),
  request = require("request-promise")


// ---------------------------------------------------------------------------
// Promise Methods

var prepareData = function(card) {
  console.log("prepareData")
  return new Promise(function(ok, error) {
    (this.card = card) ? ok() : err()
  })
}

var getXML = function() {
  console.log("getXML")
  return request({url: this.card.plist, gzip: true})
}

var writeXML = function(file){
  console.log("writeXML")
  return fs.writeFile("./lib/" + this.card.id + ".plist", file)
}

var getSprite = function() {
  console.log("getSprite")
  return request({url: this.card.sprite, gzip: true, encoding: "binary"})
}

var writeSprite = function(file) {
  console.log("writeSprite")
  return fs.writeFile("./lib/" + this.card.id + ".png", file, "binary")
}

var parseXML = function() {
  console.log("parseXML")
  var obj = plist.parse(fs.readFileSync("./lib/" + this.card.id + ".plist", "utf8"))
  var framename = this.card.frame + "000.png"
  var frame = obj.frames[framename].frame
  var values = frame.replace(/[{}]/g, "").split(",")
  var data = { x: values[0], y: values[1], width: values[2], height: values[3] }
  return data
}

// Does not return a promise (due to chained methods)
var cropImage = function(data){
  console.log("cropImage")
  var filename = "./../app/images/avatar/" + this.card.id + ".png"
  console.log(filename)
  return gm("./lib/" + this.card.id + ".png")
    .crop(data.width, data.height, data.x, data.y)
    .write(filename, function(error){
      if (!error) {
        fs.unlink("./lib/" + this.card.id + ".plist")
        fs.unlink("./lib/" + this.card.id + ".png")
        console.log("Image Created")
      }
    })
}


// ---------------------------------------------------------------------------
// Turn cards into avatars

var cards = require("../app/data/assets").cards
var cardIds = Object.keys(cards)

prepareData(cards[0])
  .then(getXML)
  .then(writeXML)
  .then(getSprite)
  .then(writeSprite)
  .then(parseXML)
  .then(cropImage)
  .catch(function(error){
    console.log(error)
  })
  .done()



