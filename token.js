var tako = require("tako")
, crypto = require("crypto")

// the default middleware, so it just works.
module.exports = sessionToken

var handlers = {}
, defaultKey = "tako-session"

// call once to set up the default
sessionToken()

function sessionToken (req, res) {
  var tok = defaultKey
  if (typeof req === "object" && typeof res === "object") {
    return handler(tok)(req, res)
  } else {
    if (typeof req === "string" || Buffer.isBuffer(req)) {
      tok = String(req)
    }
    if (!tok) throw new Error("tako-session needs a token")
    return handler(tok)
  }
}

function handler (tok) {
  handlers[tok] = handlers[tok] || function handle (req, res) {
    if (!tok) throw new Error("tako-session needs a token")
    if (!req.cookies) {
      throw new Error("session token requires cookies")
    }
    var key = req.cookies.get(tok, {signed: true})
    if (!key) {
      key = crypto.randomBytes(30).toString("base64")
      req.cookies.set(tok, key, {signed: true})
    }
    req.session = res.session = key
  }
  return handlers[tok]
}
