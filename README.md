# tako-session-token

Just a session token middleware for Tako.  Works great with
`tako-cookies`.

## Usage

```javascript
var sessionToken = require("tako-session-token")

// use the default token of "tako-session"...
app.on("request", sessionToken)

// or define one of your own
app.on("request", sessionToken("myapp-session"))

// later...
app.route("/foo", function (req, res) {
  console.log(req.session) // some random string.

  // the idea is that then that random string will
  // be a key in some sort of persistent session
  // store such as redis, or something.
})
```

