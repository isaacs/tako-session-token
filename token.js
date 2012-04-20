var tako = require("tako")
, crypto = require("crypto")
, EE = require("events").EventEmitter

// the default middleware, so it just works.
module.exports = SessionToken

// make the class act as one itself.
SessionToken.call(SessionToken, "tako-session")

function SessionToken (tok) {
  if (!tok) throw new Error("tako-session needs a token")
  if (!(this instanceof SessionToken) && this !== SessionToken) {
    return new SessionToken(tok)
  }

  var myEE = new EE()
  this.on = myEE.on.bind(myEE)
  this.emit = myEE.emit.bind(myEE)

  myEE.on("request", function (req, res) {
    if (!req.cookies) {
      throw new Error("session token requires cookies")
    }
    var key = req.cookies.get(tok, {signed: true})
    if (!key) {
      key = crypto.randomBytes(30).toString("base64")
      req.cookies.set(tok, key, {signed: true})
    }
    req.session = res.session = key
  })
}
