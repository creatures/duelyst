// ---------------------------------------------------------------------------
// Vendor

var fs = require("fs")
  gm = require("gm")
  plist = require("plist"),
  request = require("request")


// ---------------------------------------------------------------------------

var saveAvatar = function(card) {

  console.log("---------------------------------")
  console.log(card.name)

  // XML
  request.get({url: card.plist, gzip: true}, function(error, response, body) {

    // Save XML
    fs.writeFile("./lib/" + card.id + ".plist", body, function(error){

      // Sprite
      request({url: card.sprite, gzip: true, encoding: "binary"}, function(error, response, body){

        // Save Sprite
        fs.writeFile("./lib/" + card.id + ".png", body, "binary", function(error){

          // Parse Data
          var obj = plist.parse(fs.readFileSync("./lib/" + card.id + ".plist", "utf8"))
          var framename = card.frame + "000.png"
          var frame = obj.frames[framename].frame
          var values = frame.replace(/[{}]/g, "").split(",")
          var data = { x: values[0], y: values[1], width: values[2], height: values[3] }

          // Crop Image
          var filename = "./app/images/avatar/" + card.id + ".png"
          return gm("./lib/" + card.id + ".png")
            .crop(data.width, data.height, data.x, data.y)
            .scale("200%")
            .write(filename, function(e){
              if (!error) {
                fs.unlink("./lib/" + card.id + ".plist")
                fs.unlink("./lib/" + card.id + ".png")
                console.log("Image Created")
              }
            })

        })

      })

    })

  })

}


// ---------------------------------------------------------------------------

var cards = require("./../app/data/assets").cards
var cardIds = Object.keys(cards)

for (var i=0; i < cardIds.length; i++) {
  var id = cardIds[i]
  var card = cards[id]

  saveAvatar(card)
}

